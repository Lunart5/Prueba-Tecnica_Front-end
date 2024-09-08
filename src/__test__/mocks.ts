import { EProfileType, IProfile } from "../interfaces/github.types";

export const mockProfiles: IProfile[] = [
  {
    login: "midu",
    id: 188390,
    node_id: "MDQ6VXNlcjE4ODM5MA==",
    avatar_url: "https://avatars.githubusercontent.com/u/188390?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/midu",
    html_url: "https://github.com/midu",
    followers_url: "https://api.github.com/users/midu/followers",
    following_url: "https://api.github.com/users/midu/following{/other_user}",
    gists_url: "https://api.github.com/users/midu/gists{/gist_id}",
    starred_url: "https://api.github.com/users/midu/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/midu/subscriptions",
    organizations_url: "https://api.github.com/users/midu/orgs",
    repos_url: "https://api.github.com/users/midu/repos",
    events_url: "https://api.github.com/users/midu/events{/privacy}",
    received_events_url: "https://api.github.com/users/midu/received_events",
    type: EProfileType.user,
    site_admin: false,
    score: 1.0,
    followers: 0,
    public_repos: "",
  },
  {
    login: "midudev",
    id: 1561955,
    node_id: "MDQ6VXNlcjE1NjE5NTU=",
    avatar_url: "https://avatars.githubusercontent.com/u/1561955?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/midudev",
    html_url: "https://github.com/midudev",
    followers_url: "https://api.github.com/users/midudev/followers",
    following_url:
      "https://api.github.com/users/midudev/following{/other_user}",
    gists_url: "https://api.github.com/users/midudev/gists{/gist_id}",
    starred_url: "https://api.github.com/users/midudev/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/midudev/subscriptions",
    organizations_url: "https://api.github.com/users/midudev/orgs",
    repos_url: "https://api.github.com/users/midudev/repos",
    events_url: "https://api.github.com/users/midudev/events{/privacy}",
    received_events_url: "https://api.github.com/users/midudev/received_events",
    type: EProfileType.user,
    site_admin: false,
    score: 1.0,
    followers: 0,
    public_repos: "",
  },
];

export const followersMock = [
  { followers: 2, login: "profile1" },
  { followers: 2, login: "profile2" },
];

export const errorProfileFollowersUrls = [
  { url: "https://api.github.com/user/1", userName: "user1" },
  { url: "https://api.github.com/user/1", userName: "user1" },
];

export const profileFollowersUrls = [
  {
    url: "https://api.github.com/users/profile1/followers",
    userName: "profile1",
  },
  {
    url: "https://api.github.com/users/profile2/followers",
    userName: "profile2",
  },
];
