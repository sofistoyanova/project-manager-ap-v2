import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Task from "./Task";

const Project = () => {
  const [projectName, setProjectName] = useState("Loading...");
  const [projectDescription, setProjectDescription] = useState("");
  const [tasksArr, setTasksArr] = useState([]);
  const pageUrl = window.location.search;
  const params = new URLSearchParams(pageUrl);
  const projectId = params.get("projectId");

  const fetchProject = () => {
    const xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.open("GET", `/api/projects/project?projectId=${projectId}`);
    xhttp.onload = function () {
      const project = xhttp.response;
      if (project.status == 200) {
        setProjectName(project.message.name);
        setProjectDescription(project.message.description);
        setTasksArr(project.message.tasks);
        if (project.message.tasks.length < 0) {
          setTasksArr(project.task);
        }
      }
    };
    xhttp.send();
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div>
      <h2>{projectName}</h2>
      <p>{projectDescription}</p>
      <h3 className="tasksTitle">Tasks:</h3>

      <div className="tasksContainer">
        {tasksArr.length > 0 ? (
          tasksArr.map((task) => {
            return (
              <div>
                {tasksArr.length > 0 ? (
                  <Task
                    onTaskUpdate={fetchProject}
                    taskId={task._id}
                    taskName={task.name}
                    taskStatus={task.completed}
                  />
                ) : (
                  "No tasks yet"
                )}
              </div>
            );
          })
        ) : (
          <p>No task</p>
        )}
      </div>
      <CreateTask onTaskCreate={fetchProject} projectId={projectId} />
    </div>
  );
};

export default Project;
