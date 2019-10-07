import React from 'react'
import Header from '../../commons/header/Header.js'
import Main from '../../commons/main/Main.js'
import Footer from '../../commons/footer/Footer.js'
import './HomePage.css'

const HomePage = ()=>{
    return (    
        <div className='home-page'>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
};

export default HomePage;
