import { getRepoURL, searchForChangelog, listReleasesFromRepo, listTagsFromRepo } from "./libAPI"
import { raw } from "./parsers"

export const RELEASE_FEED = {
  RELEASES: "releases",
  TAGS: "tags"
}
export const FILE_TYPE = {
  MARKDOWN: "markdown",
  RAW: "raw",
  HTML: "html"
}

const getReleaseFeed = async ({ owner, repo }) => {
  const releases = await listReleasesFromRepo(owner, repo)
  const tags = await listTagsFromRepo(owner, repo)

  const preferedReleaseFeed = releases.length ? RELEASE_FEED.RELEASES : RELEASE_FEED.TAGS
  return {
    releases,
    tags,
    preferedReleaseFeed,
    lastRelease: preferedReleaseFeed === RELEASE_FEED.RELEASES ? releases[0] : tags[0]
  }
}
const detectChangelogType = file =>
  file.includes(".md") || file.includes(".MD") ? FILE_TYPE.MARKDOWN : FILE_TYPE.RAW

export const createProject = async (owner, repo) => {
  const changelog = (await searchForChangelog(owner, repo)) || {
    name: null
  }
  const projectReleases = await getReleaseFeed({ owner, repo })

  return {
    owner,
    repo,
    name: repo,
    urlRepo: getRepoURL(owner, repo),
    changelog: {
      file: changelog.name,
      type: detectChangelogType(changelog.name),
      parser: raw,
      url: changelog.url
    },
    // urlChangelog: changelog.length ? changelog[0].url : null,
    projectReleases
  }
}
