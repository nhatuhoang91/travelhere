import React from 'react'
import './SigninForm.css'
const SigninForm = ({signinOrSignup}) => {
    return(
        <div className='signin-form'>
            <input className='email-input' type='text' placeholder='Email'/>
            <input className='password-input' type='text' placeholder='Password'/>
            <button className='signin-button'>Sign in</button>
        </div>
    )
}
export default SigninForm