const activateProfileEmail = (user) => {
    const userEmail = user['email']
    const firstName = user['firstName']
    const lastName = user['lastName']
    const key = user['activationKey']

    const url = `http://localhost:5001/activate-profile?key=${key}`
    const email = {
        from: 'My website',
        to: userEmail,
        subject: 'Activate profile',
        html: `
            <p>Hey ${firstName} ${lastName},</p>
            <p>You requested a link to reset your passwword</p>
            <p>Open this link in the browser to change your password</p>
            <a href=${url}>${url}</a>
        ` 
    }
    return email
}

const resetPasswordEmail = (user, password) => {
    const userEmail = user['email']
    const firstName = user['firstName']
    const lastName = user['lastName']
    const key = user['activationKey']

    //const url = `http://localhost:5001/activate-profile?key=${key}`
    const email = {
        from: 'My website',
        to: userEmail,
        subject: 'New password',
        html: `
            <p>Hey ${firstName} ${lastName},</p>
            <p>this is your new password</p>
            <p>${password}</p>
        ` 
    }
    return email
}

module.exports = { activateProfileEmail, resetPasswordEmail }