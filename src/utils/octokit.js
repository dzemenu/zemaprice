import { Octokit } from "@octokit/rest"
const authUrl = import.meta.env.REACT_GH_TOKEN
export const octokit = new Octokit({
    auth: authUrl,
    userAgent: 'skylight v1'
});