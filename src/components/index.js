import React, { Component } from "react"

import { createProject } from "../core/lib"

const projects = [
  {
    repo: "node",
    owner: "nodejs"
  },
  { owner: "AnalyticalGraphicsInc", repo: "cesium" },
  { owner: "palantir", repo: "blueprint" }
]

const styleProject = {
  border: "1px solid #888",
  boxShadow: "2px 2px 5px #777",
  background: "#eee",
  padding: "1em",
  margin: "1em"
}

const ProjectConf = ({ project, onConfClick }) =>
  <div>
    <h3>Conf<button onClick={onConfClick}>x</button></h3>
    <div>
      <p>Owner : {project.owner}</p>
      <p>Repo : {project.repo}</p>
      <p>Release feed: {project.projectReleases.preferedReleaseFeed}</p>
      <p>Changelog file: {project.projectReleases.preferedReleaseFeed}</p>
    </div>
  </div>

const ProjectView = ({ project, onConfClick }) =>
  <div>
    <h3>{project.name}<button onClick={onConfClick}>o</button></h3>
    <div>Last Release : {project.projectReleases.lastRelease.name}</div>
    <div>Changelog</div>
  </div>

class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: null,
      isConfig: false
    }
  }
  componentDidMount() {
    this.updateProject()
  }

  showConfigMode = () => this.setState({ isConfig: true })
  hideConfigMode = () => this.setState({ isConfig: false })

  updateProject = () => {
    const { owner, repo } = this.props.project
    createProject(owner, repo)
      .then(project => this.setState({ project }))
      .catch(err => console.error("Error", err))
  }
  render() {
    const { project, isConfig } = this.state
    console.log(project)
    return (
      <div style={styleProject}>
        {project
          ? isConfig
            ? <ProjectConf project={project} onConfClick={this.hideConfigMode} />
            : <ProjectView project={project} onConfClick={this.showConfigMode} />
          : "..."}
      </div>
    )
  }
}

const App = () =>
  <div style={{ display: "flex" }}>{projects.map((project, i) => <Project key={i} project={project} />)}</div>

export default App
