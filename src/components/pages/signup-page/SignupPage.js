import React from 'react'
import MainSignupPage from './main/MainSignupPage.js'
import Footer from '../../commons/footer/Footer.js'
import './SignupPage.css'
const SignupPage = ()=>{
    return (    
        <div className='signup-page'>
            <header></header>
            <main>
                <MainSignupPage/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default SignupPage;