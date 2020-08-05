import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getMethod, deleteMethod } from "../helpers/fetch";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsMsg: "",
      projects: [],
    };
  }

  async deleteProject(projectId) {
    let deleteProjectResponse = await deleteMethod(
      `/api/projects/delete/${projectId}`
    );
    deleteProjectResponse = deleteProjectResponse.data;

    if (deleteProjectResponse.status == 200) {
      window.location.reload();
    }
  }

  async fetchProjects() {
    const userId = window.localStorage.getItem("userId");
    let getProjectsResponse = await getMethod(
      `/api/projects/?userId=${userId}`
    );
    getProjectsResponse = getProjectsResponse.data;

    if (getProjectsResponse.status == 200) {
      const projectsArr = getProjectsResponse.message;
      this.setState({ projects: projectsArr });
    } else {
      this.setState({ projectsMsg: "No projects yet" });
    }
  }

  async componentDidMount() {
    this.fetchProjects();
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="mainHeadline">Dashboard</h1>

          <div className="projectsContainer">
            <h2 className="projectsContainerTitle">My projects</h2>
            <p className="noProjectsText">{this.state.projectsMsg}</p>
            {this.state.projects.map((project) => {
              return (
                <div className="project">
                  <h3 className="projectName">{project.name}</h3>
                  <p>{project.description}</p>
                  <Link
                    className="projectLink"
                    to={`/project?projectId=${project._id}`}
                  >
                    See tasks
                  </Link>
                  <div>
                    <button
                      onClick={() => {
                        this.deleteProject(project._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to="addProject" className="addProjectButton">
            + Add Project
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Home);
