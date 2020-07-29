class Auth {
    constructor() {
         this.authenticated = false
    }

    login(cb) {
         this.authenticated = window.localStorage.getItem('loggedIn')
         cb()
    }

    logout(cb) {
         this.authenticated = false
         cb()
    }

    isAuthenticated() {
         return this.authenticated
    }
}

export default new Auth()