export const userSignupValidation = (formData) => {
    const { email, firstName, lastName, password, confirmPassword } = formData
    const emailPattern = /^\S+@\S+\.\S+$/
    const emailPatternMatch = email.match(emailPattern)
    let message = {}

    if(email || password || confirmPassword || firstName || lastName) {
        
        if(firstName.length < 2) {
            message = {isValid: false, message: 'First name should contain at lest 2 characters'}
            return message
        } else if(lastName.length < 2) {
            message = {isValid: false, message: 'Last name should contain at lest 2 characters'}
            return message
        } else if(password.length < 7) {
            message = {isValid: false, message: 'Password lenght must be at least 7 characters long'}
            return message
        } else if (password !== confirmPassword) {
            message = {isValid: false, message: 'Passwords did not match'}
            return message
        } else if(!emailPatternMatch) {
            message = {isValid: false, message: 'Email is not in valid format'}
            return message
        }
        message = {isValid: true}
        return message
    } else {
        message = {isValid: false, message: 'Fillin all details'}
        return message
    }
}

export const userLoginValidation = (formData) => {
    const {email, password} = formData
    const emailPattern = /^\S+@\S+\.\S+$/
    const emailPatternMatch = email.match(emailPattern)
    let message = {}
    
    if(email || password) {
      if(!emailPatternMatch) {
        message = {isValid: false, message: 'Email is not in valid format'}
        return message
      } else if(password.length < 7) {
        message = {isValid: false, message: 'password should be at least 7 characters long'}
        return message
      }
      message = {isValid: true}
      return message
    } else {
        message = {isValid: false, message: 'Fillin all details'}
        return message
    }
}