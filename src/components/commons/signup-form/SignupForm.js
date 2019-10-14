import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {SIGNIN_PAGE_URL} from '../../../constants'
import {signupWithEmailAndPasswordThunk} from '../../../store/sign-up-page-store/action-thunk'
import {changeIsWaiting, 
    changeEmailError, 
    changePasswordError,
    changeRetypePasswordError,
    changeUsernameError,
    changeSignupError} from '../../../store/sign-up-page-store/action'
import './SignupForm.css'

class SignupForm extends Component{
    constructor(props){
        super(props)
        var _waitingStatus = ''
        this.onSignupClicked = this.onSignupClicked.bind(this)
        this.onSigninNavClicked = this.onSigninNavClicked.bind(this)
    }
    
    onSigninNavClicked(e){
        e.preventDefault()
        this.props.history.replace('/sign-in')
    }
    onSignupClicked(e){
        e.preventDefault()
        this.props.dispatch(changeEmailError(''))
        this.props.dispatch(changePasswordError(''))
        this.props.dispatch(changeRetypePasswordError(''))
        this.props.dispatch(changeUsernameError(''))
        this.props.dispatch(changeSignupError(''))
        this.props.dispatch(changeIsWaiting(true))
        var _isError = false
        const {_email, _password, _retypePassword, _username} = this.refs
        //validate Email
        if(_email.value == null || _email.value === undefined || _email.value.length===0){
            this.props.dispatch(changeEmailError('Please enter email'))
            return
        }else if(!validateEmail(_email.value.trim())){
            this.props.dispatch(changeEmailError('Email is invalid'))
            return
        }else if(!_email.value.trim().includes('@gmail.com') && !_email.value.trim().includes('@yahoo.com')){
            this.props.dispatch(changeEmailError('Only Gmail and Yahoo mail are accepted'))
            return
        }

        //Validate password
        if(_password.value == null || _password.value === undefined || _password.value.length===0){
            this.props.dispatch(changePasswordError('Please enter password'))
            return
        }else if(!/^(?=.*[a-z]).+$/.test(_password.value.trim())){
            this.props.dispatch(changePasswordError('Password must contain at least 1 lower case letter'))
            return
        }else if(!/^(?=.*[A-Z]).+$/.test(_password.value.trim())){
            this.props.dispatch(changePasswordError('Password must contain at least 1 upper case letter'))
            return
        }else if(_password.value.trim().length <8 || _password.value.trim().length>25){
            this.props.dispatch(changePasswordError('Password must has length in range 8 to 25 characters'))
            return
        }

        //check retype password match with password
        if(_retypePassword.value.trim() !== _password.value.trim()){
            this.props.dispatch(changeRetypePasswordError('Retype Password does not match'))
            return
        }

        //validate user display name
        if(_username.value.length ===0){
            this.props.dispatch(changeUsernameError('Please enter user display name'))
            return
        }else if(_username.value.trim().length < 2 || _username.value.trim().length > 50){
            this.props.dispatch(changeUsernameError('Username must has length in range 2 to 50 characters'))
            return
        }
        //If input validation passed. Sign up!
        this.props.dispatch(signupWithEmailAndPasswordThunk(_email.value.trim(),
        _password.value.trim(), _username.value.trim(), () => this.props.history.replace('/')))
    }   
    render(){
        if(this.props.isWaiting){
            this._waitingStatus = 'Just a second...'
        }else{
            this._waitingStatus = ''
        }
        return(
            <div className='signup-form'>
                <p id='signup-error'>{this.props.signupError}</p>
                <p className='error'>{this.props.emailError}</p>
                <input className='email-input' ref='_email' type='text' placeholder='Email'/>
                <p className='error'>{this.props.passwordError}</p>
                <input className='password-input' ref='_password' type='text' placeholder='Password'/>
                <p className='error'>{this.props.retypePasswordError}</p>
                <input className='retype-password-input' ref='_retypePassword' type='text' placeholder='Re-type Password'/>
                <p className='error'>{this.props.usernameError}</p>
                <input className='user-name-input' ref='_username' type='text' placeholder='User display name'/>           
                <button className='signup-button' onClick={this.onSignupClicked}>Sign up</button>
                <Link className='sign-in' onClick={this.onSigninNavClicked}>Already have an account?</Link>
                <p className='waiting-status'>{this._waitingStatus}</p>
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        emailError : state.signupPageStore.emailError,
        passwordError : state.signupPageStore.passwordError,
        retypePasswordError : state.signupPageStore.retypePasswordError,
        usernameError : state.signupPageStore.usernameError,
        signupError : state.signupPageStore.signupError,
        isWaiting: state.signupPageStore.isWaiting
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