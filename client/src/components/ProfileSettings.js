import React, { Component } from 'react'


class ProfileSettings extends Component {
    handleOnInputChange(event) {
        return
    }

    render() {
        return (
            <div className="container">
               <h1>Profile General Settings</h1>

               <div className="formContainer">
                   <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">First name</label>
                        <input type="email" placeholder="Sofi" className="" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Last name</label>
                        <input type="email" className="" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                   </form>                   
               </div>

               <div className="formContainer">
               <h5>Change password</h5>

                   <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Type old password</label>
                        <input type="email" placeholder="" className="" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">New password</label>
                        <input type="email" className="" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Confirm new password</label>
                        <input type="email" className="" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                   </form>

                   
               </div>
            </div>
        )
    }
}

export default ProfileSettings