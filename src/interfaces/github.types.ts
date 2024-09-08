export enum EProfileType {
  orga = "Organization",
  user = "user",
}

export interface IProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: EProfileType;
  site_admin: boolean;
  score: number;
  followers: number;
  public_repos: string;
}

export interface IReponse<T> {
  incomplete_status: boolean;
  items: T[];
  total_count: number;
}

export interface IFollowers {
  followers: number;
  login: string;
}

export interface IFetchList {
  url: string;
  userName: string;
}
