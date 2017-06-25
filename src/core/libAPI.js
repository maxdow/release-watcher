const http = require("axios")

http.defaults.headers.common["User-Agent"] = "maxdow"

http.defaults.auth = {
  username: "maxdow",
  password: ""
}

export const getRepoURL = (owner, repo) => `https://github.com/${owner}/${repo}`

export const listReleasesFromRepo = (owner, repo) => {
  return http.get(`https://api.github.com/repos/${owner}/${repo}/releases`).then(result => {
    return result.data.map(release => ({
      published_at: release.published_at,
      name: release.name,
      body: release.body
    }))
  })
}

const getTagCommitInfo = tagData => {
  return Promise.resolve({ name: "000", date: "--" })
  // return http.get(tagData.commit.url).then(result => ({
  //   name: tagData.name,
  //   date: result.data.commit.committer.date
  // }))
}

export const listTagsFromRepo = (owner, repo) => {
  return http
    .get(`https://api.github.com/repos/${owner}/${repo}/tags`)
    .then(result => Promise.all(result.data.map(getTagCommitInfo)))
}

/**
 * Search for a changelog file in a repository
 * @param {String} owner
 * @param {String} repo
 * @return {Array} List of detected possible changelog files
 */
export const searchForChangelog = (owner, repo) => {
  return http.get(`https://api.github.com/repos/${owner}/${repo}/contents`).then(result => {
    return result.data
      .filter(file => file.name.includes("change") || file.name.includes("CHANGE"))
      .map(file => ({
        name: file.name,
        url: file.download_url
      }))[0]
  })
}
