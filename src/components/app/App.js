import React from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import HomePage from '../pages/home-page/HomePage.js'
import SigninPage from '../pages/signin-page/SigninPage.js'
import SignupPage from '../pages/signup-page/SignupPage.js'
import ProfilePage from '../pages/profile-page/ProfilePage.js'
import UserPage from '../pages/user-page/UserPage.js'

import {
   HOME_PAGE_URL, 
   SIGNUP_PAGE_URL,
   PROFILE_PAGE_URL,
   USER_PAGE_URL,
   SIGNIN_PAGE_URL} from '../../constants'

function App() {
  return (
    <div className='app'>
      <Switch>
        <Route exact path={HOME_PAGE_URL} component={HomePage}/>
        <Route exact path={SIGNIN_PAGE_URL} component={SigninPage}/>
        <Route exact path={SIGNUP_PAGE_URL} component={SignupPage}/>
        <Route exact path={PROFILE_PAGE_URL} component={ProfilePage}/>
        <Route exact path={USER_PAGE_URL} component={UserPage}/>
      </Switch>
    </div>
  );
}

export default App;
