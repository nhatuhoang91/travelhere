import React from 'react'
import MainSignupPage from './main/MainSignupPage.js'
import Footer from '../../commons/footer/Footer.js'
import './SignupPage.css'
const SignupPage = ()=>{
    return (    
        <div className='signup-page'>
            <header className ='signup-page-header'/>
            <main className='signup-page-main'>
                <MainSignupPage/>
            </main>
            <footer className='signup-page-footer'>
                <Footer/>
            </footer>
        </div>
    );
};

export default SignupPage;