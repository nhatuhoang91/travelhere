import React from 'react'
import {AuthStatus} from '../../../types'
import SearchBar from '../search-bar/SearchBar.js'
import UserProfileNav from '../nav/user-profile-nav/UserProfileNav.js'
import SigninNav from '../nav/signin-nav/SigninNav.js'
import SignoutNav from '../nav/signout-nav/SignoutNav.js'
import Logo from '../logo/Logo.js'
import './Header.css';

const Header = ({authStatus}) =>{
    if(authStatus === AuthStatus.SIGNED_IN){
        return (
            <header>
                <div className='header-left'>
                    <Logo/>
                </div>
                <div className='header-center'>
                    <SearchBar/>
                </div>
                <div className='header-right'>
                    <UserProfileNav/>
                    <SignoutNav/>
                </div>
            </header>
        )
    }else{
        return (
            <header>
                <div className='header-left'>
                    <Logo/>
                </div>
                <div className='header-center'>
                    <SearchBar/>
                </div>
                <div className='header-right'>
                    <SigninNav/>
                </div>
            </header>
        )
    }
}

export default Header;