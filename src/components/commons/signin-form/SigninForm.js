import React from 'react'
import {Link} from 'react-router-dom'
import {SIGNUP_PAGE_URL, FORGOT_PASSWORD_PAGE_URL} from '../../../constants'
import './SigninForm.css'
const SigninForm = ({signinOrSignup}) => {
    return(
        <div className='signin-form'>
            <input className='email-input' type='text' placeholder='Email'/>
            <input className='password-input' type='text' placeholder='Password'/>
            <button className='signin-button'>Sign in</button>
            <Link className='forgot-password' to={FORGOT_PASSWORD_PAGE_URL}>Forgot password?</Link>
            <Link className='create-new-account' to={SIGNUP_PAGE_URL}>Sign Up</Link>
        </div>
    )
}
export default SigninForm