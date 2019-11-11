import React, {Component} from 'react'
import {dataURLtoBlob} from '../../../utils/image-utils'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {SIGNIN_PAGE_URL} from '../../../constants'
import {SignupStep} from '../../../types'
import {signupWithEmailAndPasswordThunk, updateUsernameAndProfilePictureThunk} from '../../../store/sign-up-page-store/action-thunk'
import {changeIsWaitingAction, 
    changeEmailErrorAction, 
    changePasswordErrorAction,
    changeRetypePasswordErrorAction,
    changeUsernameErrorAction,
    changeSignupErrorAction,
    changeSignupStepAction} from '../../../store/sign-up-page-store/action'
import './SignupForm.css'

class SignupForm extends Component{
    constructor(props){
        super(props)
        this._waitingStatus = ''

        this.canvasContext = null
        this.coordinator = {
            x:0,
            y:0
        }
        this.signupData = {
            email: '',
            password: '',
            retypePassword: '',
            username: '',
            profilePictureBlob: null
        }
        this.image = null
        this.onSignupClicked = this.onSignupClicked.bind(this)
        this.onSigninNavClicked = this.onSigninNavClicked.bind(this)
        this.onSignupDoneClicked = this.onSignupDoneClicked.bind(this)
        this.onSelectImageChanged = this.onSelectImageChanged.bind(this)
        this.onPickImageClicked = this.onPickImageClicked.bind(this)
        this.onMouseClickedCanvas = this.onMouseClickedCanvas.bind(this)
        this.onMouseMovedCanvas = this.onMouseMovedCanvas.bind(this)
       // this.onResize = this.onResize.bind(this)
    }
    onMouseMovedCanvas(e){
        const dpi = window.devicePixelRatio
        if(!this.canvasContext){
            const {_image_canvas_mask_step3} = this.refs
            this.canvasContext = _image_canvas_mask_step3.getContext("2d")
        }
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width,
            this.canvasContext.canvas.height)
        var x = (e.clientX - this.canvasContext.canvas.getBoundingClientRect().left) * dpi
        var y = (e.clientY - this.canvasContext.canvas.getBoundingClientRect().top) * dpi
       // console.log("(x, y) : ("+x+", "+y+")")
        if(x<300){
            x = 0
        }else if(x > this.canvasContext.canvas.width - 300){
            x = this.canvasContext.canvas.width - 600
        }else{
            x = x - 300
        }

        if(y<300){
            y = 0
        }else if(y> this.canvasContext.canvas.height - 300){
            y = this.canvasContext.canvas.height - 600
        }else{
            y = y - 300
        }
        this.canvasContext.strokeRect(x, y, 600, 600)
        this.coordinator.x = x
        this.coordinator.y = y
    }
    onMouseClickedCanvas(e){
       if(this.canvasContext){
          // console.log("x: ", this.coordinator.x)
            const {_crop_image_div_step3, _image_canvas_step3, _profile_image_step3} = this.refs            
            
            var image = new Image()
            image.src = _image_canvas_step3.toDataURL()
            var context = _image_canvas_step3.getContext("2d")
            const imageData = context.getImageData(this.coordinator.x, this.coordinator.y, 
                600, 600)
             
            context.clearRect(0, 0, this.canvasContext.canvas.width,
                this.canvasContext.canvas.height)

            _image_canvas_step3.setAttribute('height', 600)
            _image_canvas_step3.setAttribute('width', 600)
            context = _image_canvas_step3.getContext("2d")
            context.putImageData(imageData, 0, 0)
            console.log("data: ", imageData)
            _profile_image_step3.src = _image_canvas_step3.toDataURL()
            this.signupData.profilePictureBlob = dataURLtoBlob(_image_canvas_step3.toDataURL())
            this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width,
                this.canvasContext.canvas.height)
            this.canvasContext = null
            _crop_image_div_step3.hidden = true
        }
    }
    onPickImageClicked(e){
        e.preventDefault()
        const {_pick_image_input_step3} = this.refs
        _pick_image_input_step3.click()
    }
    onSignupClicked(e){
        e.preventDefault()
        this.props.dispatch(changeEmailErrorAction(''))
        this.props.dispatch(changePasswordErrorAction(''))
        this.props.dispatch(changeRetypePasswordErrorAction(''))
        this.props.dispatch(changeUsernameErrorAction(''))

        const {_email_step1, _password_step1, _retype_password_step1} = this.refs

        //validate Email
        if(_email_step1.value == null || _email_step1.value === undefined || _email_step1.value.length===0){
            this.props.dispatch(changeEmailErrorAction('Please enter email'))
            return
        }else if(!validateEmail(_email_step1.value.trim())){
            this.props.dispatch(changeEmailErrorAction('Email is invalid'))
            return
        }else if(!_email_step1.value.trim().includes('@gmail.com') && !_email_step1.value.trim().includes('@yahoo.com')){
            this.props.dispatch(changeEmailErrorAction('Only Gmail and Yahoo mail are accepted'))
            return
        }

        //Validate password
        if(_password_step1.value == null || _password_step1.value === undefined || _password_step1.value.length===0){
            this.props.dispatch(changePasswordErrorAction('Please enter password'))
            return
        }else if(!/^(?=.*[a-z]).+$/.test(_password_step1.value.trim())){
            this.props.dispatch(changePasswordErrorAction('Password must contain at least 1 lower case letter'))
            return
        }else if(!/^(?=.*[A-Z]).+$/.test(_password_step1.value.trim())){
            this.props.dispatch(changePasswordErrorAction('Password must contain at least 1 upper case letter'))
            return
        }else if(_password_step1.value.trim().length <8 || _password_step1.value.trim().length>25){
            this.props.dispatch(changePasswordErrorAction('Password must has length in range 8 to 25 characters'))
            return
        }

        //check retype password match with password
        if(_retype_password_step1.value.trim() !== _password_step1.value.trim()){
            this.props.dispatch(changeRetypePasswordErrorAction('Retype Password does not match'))
            return
        }
        this.signupData.email = _email_step1.value.trim()
        this.signupData.password = _password_step1.value.trim()
        this.signupData.retypePassword = _retype_password_step1.value.trim()
        //If input validation passed, sign up!
        this.props.dispatch(signupWithEmailAndPasswordThunk(this.signupData))
    }
    onSigninNavClicked(e){
        e.preventDefault()
        this.props.history.replace('/sign-in')
    }
    onSignupDoneClicked(e){
        e.preventDefault()
        this.props.dispatch(changeSignupErrorAction(''))
        this.props.dispatch(changeIsWaitingAction(true))

        const {_username_step3} = this.refs
        //validate user display name
        if(_username_step3.value.length ===0){
            this.props.dispatch(changeUsernameErrorAction('Please enter user display name'))
            return
        }else if(_username_step3.value.trim().length < 2 || _username_step3.value.trim().length > 50){
            this.props.dispatch(changeUsernameErrorAction('Username must has length in range 2 to 50 characters'))
            return
        }
        //If input validation passed clear input. Sign up!
        this.signupData.username = _username_step3.value.trim()
        console.log('Sign up  data: ', this.signupData)
        this.props.dispatch(updateUsernameAndProfilePictureThunk(this.signupData.username,
            this.signupData.profilePictureBlob, () => this.props.history.push('/')))
    }   
    onSelectImageChanged(e){
        console.log("Img ", this.refs._pick_image_input_step3.files[0])
        const {_crop_image_div_step3, _image_canvas_step3, 
            _image_canvas_mask_step3, _pick_image_input_step3} = this.refs

        _crop_image_div_step3.hidden = false

        const dpi = window.devicePixelRatio
        
        var img = new Image()
        var file = _pick_image_input_step3.files[0]

	    var reader = new FileReader();
        img.onload = () => {
            this.image = img
            renderCanvas(_image_canvas_step3, _image_canvas_mask_step3, this.image)
        }
	    reader.onload = function(){
	    	img.src = reader.result
			
        }  
        reader.readAsDataURL(file);
        //reset input file!!! 
        _pick_image_input_step3.value = '' 
    }
   /* onResize(e){
        e.preventDefault()
        console.log('onResize()')
        const {_image_canvas_step3, _image_canvas_mask_step3} = this.refs
        if(this.image){
            renderCanvas(_image_canvas_step3, _image_canvas_mask_step3, this.image)
        }
    }*/
    render(){
        if(this.props.isWaiting){
            this._waitingStatus = 'Just a second...'
        }else{
            this._waitingStatus = ''
        }
        //console.log('render')
        return(
            <div className='signup-form-div-step3'>
                <div className='signup-form-inner-div-step3'>
                    <p className='signup-error-step3'>{this.props.signupError}</p>
                    <p className='username-error-step3'>{this.props.usernameError}</p>
                    <input className='user-name-input-step3' ref='_username_step3' type='text' placeholder='User display name'/>
                    <div className='pick-profile-image-div-step3'>
                        <input hidden className='pick-image-input-step3'ref='_pick_image_input_step3' type='file' accept='image/*' onChange={this.onSelectImageChanged}/>
                        <img className='picked-profile-image-step3' ref='_profile_image_step3' src="/images/placeholder.jpg" alt='profile'/>
                        <button className='pick-profile-image-button-step3' onClick={this.onPickImageClicked}>Pick Image</button>
                    </div>  
                    <button className='signup-done-button-step3' onClick={this.onSignupDoneClicked}>Done</button>
                    <button className='back-button-step3'>Back</button>
                </div>
                <div className='crop-image-div-step3' ref='_crop_image_div_step3' hidden>
                    <canvas className='image-canvas-step3' ref='_image_canvas_step3'></canvas>
                    <canvas className='image-canvas-mask-step3' ref='_image_canvas_mask_step3'
                     onMouseMove={this.onMouseMovedCanvas} onClick={this.onMouseClickedCanvas}></canvas>
                    <div className='control-button-div-step3'>
                        <button className='cancel-button-step3' ref='_cancel_button_step3'>Cancel</button>
                        <button className='done-button-step3' ref='_done_button_step3'>Done</button> 
                    </div>
                </div>
            </div>
        )
        /*if(this.props.signupStep === SignupStep.STEP_1){
            return(
                <div className='signup-form-div-step1'>
                    <p className='email-error-step1'>{this.props.emailError}</p>
                    <input className='email-input-step1' ref='_email_step1' type='text' placeholder='Email'/>
                    <p className='password-error-step1'>{this.props.passwordError}</p>
                    <input className='password-input-step1' ref='_password_step1' type='text' placeholder='Password'/>
                    <p className='retype-password-error-step1'>{this.props.retypePasswordError}</p>
                    <input className='retype-password-input-step1' ref='_retype_password_step1' type='text' placeholder='Re-type Password'/>      
                    <button className='signup-button-step1' onClick={this.onSignupClicked}>Sign up</button>
                    <a href='' className='sign-in-step1' onClick={this.onSigninNavClicked}>Already have an account?</a>
                    <p className='waiting-status-step1'>{this._waitingStatus}</p>
                </div>
            )
        }else if (this.props.signupStep === SignupStep.STEP_2){
            return(
                <div className='signup-form-div-step2'>
                    <p className='signup-error-step2'>{this.props.signupError}</p>
                    <p className='inform-text-step2'>An verification email is sent to your email. Please verify your email.</p>
                    <button className='send-again-button-step2'>Send it again</button>
                    <p className='time-step2'>{this.props.waitingTime}</p>
                </div>
            )
        }else {
            return(
                <div className='signup-form-div-step3'>
                    <div className='signup-form-inner-div-step3'>
                        <p className='singup-error-step3'>{this.props.signupError}</p>
                        <p className='username-error-step3'>{this.props.usernameError}</p>
                        <input className='user-name-input-step3' ref='_username_step3' type='text' placeholder='User display name'/>
                        <div className='pick-profile-image-div-step3'>
                            <input hidden className='pick-image-input-step3'ref='_pick_image_input_step3' type='file' accept='image/*' onChange={this.onSelectImageChanged}/>
                            <img className='picked-profile-image-step3' ref='_profile_image_step3' src="/images/placeholder.jpg" alt='profile'/>
                            <button className='pick-profile-image-button-step3' onClick={this.onPickImageClicked}>Pick Image</button>
                        </div>  
                        <button className='signup-done-button-step3' onClick={this.onSignupDoneClicked}>Done</button>
                        <button className='back-button-step3'>Back</button>
                    </div>
                    <div className='crop-image-div-step3' ref='_crop_image_div_step3' hidden>
                        <canvas className='image-canvas-step3' ref='_image_canvas_step3'></canvas>
                        <canvas className='image-canvas-mask-step3' ref='_image_canvas_mask_step3'
                         onMouseMove={this.onMouseMovedCanvas} onClick={this.onMouseClickedCanvas}></canvas>
                        <div className='control-button-div-step3'>
                            <button className='cancel-button-step3' ref='_cancel_button_step3'>Cancel</button>
                            <button className='done-button-step3' ref='_done_button_step3'>Done</button> 
                        </div>
                    </div>
                </div>
            )
        }   */
    }
}

const mapStateToProps = (state) => {
    return {
        signupStep : state.signupPageStore.signupStep,
        emailError : state.signupPageStore.emailError,
        passwordError : state.signupPageStore.passwordError,
        retypePasswordError : state.signupPageStore.retypePasswordError,
        usernameError : state.signupPageStore.usernameError,
        signupError : state.signupPageStore.signupError,
        isWaiting: state.signupPageStore.isWaiting,
        waitingTime: state.signupPageStore.waitingTime
    };
};

const SignupFormContainer = withRouter(connect(mapStateToProps)(SignupForm));
export default SignupFormContainer

const validateEmail = (email)=>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return true
  }
    return false
}

const renderCanvas = (canvas, canvasMask, image) => {
    var style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
    var style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
    var width = image.width
    var height = image.height
    const dpi = window.devicePixelRatio
    if(width > height){
        if(style_width > style_height){//laptop, pc
            console.log("img.width > img.height, styleW > styleH")
            let ratio = height/width
            canvas.setAttribute('height', style_height * dpi)
            canvas.setAttribute('width', (style_height/ratio) * dpi)
            canvas.style.width = (style_height/ratio) +"px"

            canvasMask.setAttribute('height', style_height * dpi)
            canvasMask.setAttribute('width', (style_height/ratio) * dpi)
            canvasMask.style.width = (style_height/ratio) +"px"
        }else{//phone, tablet, ipad
            console.log("img.width > img.height, styleW < styleH")
            let ratio = height/width
            canvas.setAttribute('height', (style_width * ratio) * dpi)
            canvas.setAttribute('width', style_width * dpi);
            canvas.style.height = (style_width*ratio) +"px"

            canvasMask.setAttribute('height', (style_width * ratio) * dpi)
            canvasMask.setAttribute('width', style_width * dpi);
            canvasMask.style.height = (style_width*ratio) +"px"
        }
    }else{
        if(style_width > style_height){
            console.log("img.width < img.height, styleW > styleH")
            let ratio = width/height
            canvas.setAttribute('height', style_height * dpi);
            canvas.setAttribute('width', (style_height * ratio) * dpi);
            canvas.style.width = (style_height*ratio) +"px"

            canvasMask.setAttribute('height', style_height * dpi);
            canvasMask.setAttribute('width', (style_height * ratio) * dpi);
            canvasMask.style.width = (style_height*ratio) +"px"
        }else{
            console.log("img.width < img.height, styleW < styleH")
            let ratio = width/height
            canvas.setAttribute('height', (style_width / ratio) * dpi);
            canvas.setAttribute('width', style_width * dpi);
            canvas.style.height = (style_width/ratio) +"px"

            canvasMask.setAttribute('height', (style_width / ratio) * dpi);
            canvasMask.setAttribute('width', style_width * dpi);
            canvasMask.style.height = (style_width/ratio) +"px"
        }
    }
    var context = canvas.getContext("2d")
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.drawImage(image, 0, 0, context.canvas.width, context.canvas.height)
                // console.log("image width:  ", img.width)
                 //console.log("image height:  ", img.height)
                 //console.log("context canvas width:  ", context.canvas.width)   
                 //console.log("context canvas height:  ", context.canvas.height)  
                 //console.log("canvas style width:  ", _imageCanvas.getBoundingClientRect().width)  
                 //console.log("canvas style height:  ", _imageCanvas.getBoundingClientRect().height)     
}