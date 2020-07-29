import React from 'react'

const Logout = () => {
    window.localStorage.removeItem('userId')
    window.location.replace("/api/users/logout");
}

export default Logout