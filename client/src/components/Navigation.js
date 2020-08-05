import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      userImage: "user.png",
    };
  }

  renderNav() {
    console.log(this.props.user);
    this.state.isLoggedIn = window.localStorage.getItem("userId")
      ? true
      : false;
    if (this.state.isLoggedIn) {
      if (this.props.user.image) {
        this.state.userImage = this.props.user.image;
      }
    }

    let navContainer;

    if (!this.state.isLoggedIn) {
      navContainer = (
        <div>
          <Link to="/login" className="navLink">
            Login
          </Link>
          <Link to="/signup" className="navLink">
            Signup
          </Link>
        </div>
      );
    } else {
      console.log(this.state.userImage);
      if (this.props.user.premium) {
        navContainer = (
          <div>
            <div className="navAccountContainer">
              <img
                className="accountImage"
                src={require(`../uploads/${this.state.userImage}`)}
              />
              <span className="accountuserName">
                {this.props.user.firstName} {this.props.user.lastName}
              </span>
            </div>
            <Link to="/profileSettings" className="navLink">
              Profile Settings
            </Link>
            <Link to="/" className="navLink">
              My projects
            </Link>
            <Link to="/addProject" className="navLink">
              Create project
            </Link>
            <Link to="/logout" className="navLink">
              Logout
            </Link>
          </div>
        );
      } else {
        navContainer = (
          <div>
            <div className="navAccountContainer">
              <img
                className="accountImage"
                src={require(`../uploads/${this.state.userImage}`)}
              />
              <span className="accountuserName">
                {this.props.user.firstName} {this.props.user.lastName}
              </span>
            </div>
            <Link to="/profileSettings" className="navLink">
              Profile Settings
            </Link>
            <Link to="/" className="navLink">
              My projects
            </Link>
            <Link to="/addProject" className="navLink">
              Create project
            </Link>
            <Link to="/logout" className="navLink">
              Logout
            </Link>
            <li className="navLink checkout">
              <Checkout />
            </li>
          </div>
        );
      }
    }

    return navContainer;
  }
  render() {
    console.log(this.state.isLoggedIn);
    return (
      <div className="navWrapper">
        <div className="navLinksContainer">{this.renderNav()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, isPremium: state.isPremium };
}

export default connect(mapStateToProps)(Navigation);
