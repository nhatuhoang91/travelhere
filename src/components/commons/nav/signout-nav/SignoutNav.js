import React from 'react';
import {Link} from 'react-router-dom';
import {SIGNIN_PAGE_URL} from '../../../../constants'
const SignoutNav = () =>{
    return (
        <Link to={SIGNIN_PAGE_URL}>Sign out</Link>
    )
}

export default SignoutNav;