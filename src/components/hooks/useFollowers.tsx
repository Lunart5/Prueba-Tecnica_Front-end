import { useEffect, useState } from "react";
import { gitProfileServices } from "../../services/githubProfiles";
import {
  IFetchList,
  IFollowers,
  IProfile,
} from "../../interfaces/github.types";

export function useFollowers(usersData: IProfile[] | undefined) {
  const [followersData, setFollowersData] = useState<IFollowers[]>();
  const [loadingFollowers, setLoadingFollowers] = useState(false);

  useEffect(() => {
    const getFollowers = async (usersList: IFetchList[]) => {
      try {
        setLoadingFollowers(true);
        const results = await gitProfileServices.getFollowers(usersList);
        const successItem = results.filter(
          (item) => item.status === "fulfilled"
        );
        const followers_data = successItem.map((item) => ({
          followers: item.value.followers as number,
          login: item.value.login as string,
        }));
        setFollowersData(followers_data);
      } catch (error) {
        window.alert(`Error fetching data ${error}`);
      } finally {
        setLoadingFollowers(false);
      }
    };

    if (usersData) {
      const followersList = usersData.map((item) => ({
        url: item.followers_url,
        userName: item.login,
      }));
      getFollowers(followersList);
    }
  }, [usersData]);

  return { followersData, loadingFollowers };
}
