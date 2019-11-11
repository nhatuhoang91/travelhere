import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {SIGNUP_PAGE_URL, FORGOT_PASSWORD_PAGE_URL} from '../../../constants'
import {changeSigninErrorAction, changeIsWaitingAction} from '../../../store/sign-in-page-store/action'
import {signinWithEmailAndPasswordThunk} from '../../../store/sign-in-page-store/action-thunk'
import './SigninForm.css'

class SigninForm extends Component{
    constructor(props){
        super(props)
        var _waitingStatus = ''
        this.onSigninClicked = this.onSigninClicked.bind(this)
        this.onSignupNavClicked = this.onSignupNavClicked.bind(this)
    }
    onSignupNavClicked(e){
        e.preventDefault()
        this.props.history.replace('/sign-up')
    }
    onSigninClicked(e){
        e.preventDefault()
        this.props.dispatch(changeSigninErrorAction(''))
        this.props.dispatch(changeIsWaitingAction(true))
        const {_email, _password} = this.refs
        this.props.dispatch(signinWithEmailAndPasswordThunk(_email.value.trim(),
        _password.value.trim(), () => this.props.history.replace('/')))
    }
    render(){
        if(this.props.isWaiting){
            this._waitingStatus = 'Just a second...'
        }else{
            this._waitingStatus = ''
        }
        return(
            <div className='signin-form'>
                <p className='signin-error'>{this.props.signinError}</p>
                <input className='email-input' ref='_email' type='text' placeholder='Email'/>
                <input className='password-input' ref='_password' type='text' placeholder='Password'/>
                <button className='signin-button' onClick={this.onSigninClicked}>Sign in</button>
                <Link className='forgot-password' to={FORGOT_PASSWORD_PAGE_URL}>Forgot password?</Link>
                <p className='create-new-account' onClick={this.onSignupNavClicked}>Sign Up</p>
                <p className='waiting-status'>{this._waitingStatus}</p>
            </div>
        ) 
    }
}

const mapStateToProps = (state) => {
    return {
        signinError : state.signinPageStore.signinError,
        isWaiting: state.signinPageStore.isWaiting
    };
};

const SigninFormContainer = withRouter(connect(mapStateToProps)(SigninForm));
export default SigninFormContainer