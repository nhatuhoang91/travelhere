import React from 'react'
import MainSigninPage from './main/MainSigninPage.js'
import Footer from '../../commons/footer/Footer.js'
import './SigninPage.css'

const SigninPage = ()=>{
    return (    
        <div className='signin-page'>
            <header></header>
            <main>
                <MainSigninPage/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default SigninPage;