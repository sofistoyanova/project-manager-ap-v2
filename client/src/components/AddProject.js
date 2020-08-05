import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { addProjectValidation } from "../helpers/formValidation";
import { postMethod } from "../helpers/fetch";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addProjectStatusMessage: "",
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const form = document.querySelector("form");
    const formData = Object.fromEntries(new FormData(form).entries());
    this.handleFormValidation(formData);
  };

  handleFormValidation = async (formData) => {
    const isFormDataValid = addProjectValidation(formData);

    if (isFormDataValid.isValid) {
      try {
        const route = "/api/projects/create";
        let addProjectResponse = await postMethod(formData, route);
        addProjectResponse = addProjectResponse.data;
        if (addProjectResponse.status === 200) {
          this.setState({
            addProjectStatusMessage: addProjectResponse.message,
          });
        } else {
          this.setState({
            addProjectStatusMessage: addProjectResponse.message,
          });
        }
      } catch (err) {
        this.setState({
          addProjectStatusMessage: "There was an error please try again later!",
        });
      }
    } else {
      this.setState({ addProjectStatusMessage: isFormDataValid.message });
    }
  };

  render() {
    return (
      <div className="CreateProjectformContainer">
        <h2>Add project details</h2>
        <p>{this.state.addProjectStatusMessage}</p>
        <div className="CreateProjectformInnerContainer">
          <form className="loginForm" onSubmit={this.handleFormSubmit}>
            <label className="loginLabel">Project name:</label>
            <input
              className="loginInput"
              type="text"
              name="projectName"
              placeholder="Project Name"
              required
            />
            <label className="loginLabel">Project description:</label>
            <textarea
              className="loginInput"
              placeholder="*optional"
              name="projectDescription"
              rows="4"
            ></textarea>
            <input
              className="createProjectButton"
              type="submit"
              value="+ Add Project"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(AddProject);
