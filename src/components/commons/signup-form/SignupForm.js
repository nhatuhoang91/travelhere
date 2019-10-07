import React from 'react'
import './SignupForm.css'
const SignupForm = () => {
   return(
        <div className='signup-form'>
            <input className='email-input' type='text' placeholder='Email'/>
            <input className='password-input' type='text' placeholder='Password'/>
            <input className='retype-password-input' type='text' placeholder='Re-type Password'/>           
            <button className='signup-button'>Sign up</button>
        </div>
    ) 
}
export default SignupForm