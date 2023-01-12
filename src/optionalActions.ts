import {Content, Repository} from './main'
import {Octokit} from 'octokit'
import * as core from '@actions/core'

export const removeToken = (content: Content) => {
  if (content && content.downloadUrl) {
    content.downloadUrl = content.downloadUrl.replace(/\?(.*)/, '')
  }
  return content
}

export async function getReadmeContent(
  client: Octokit,
  repo: Repository
): Promise<string | undefined> {
  try {
    const readme: any = await client.rest.repos.getContent({
      owner: repo.owner,
      repo: repo.name,
      path: 'README.md'
    })

    return readme.content
  } catch (error) {
    core.debug(`No readme file found in repository: ${repo.name}`)
  }
}