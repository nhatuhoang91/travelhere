import React from 'react'
import {Link} from 'react-router-dom'
import {PROFILE_PAGE_URL} from '../../../../constants'

const UserProfileNav = () => {
    return (
        <Link to={PROFILE_PAGE_URL}>Profile</Link>
    )
}

export default UserProfileNav;