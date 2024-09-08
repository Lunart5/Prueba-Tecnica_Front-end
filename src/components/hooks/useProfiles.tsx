import { useState } from "react";
import { IProfile } from "../../interfaces/github.types";
import { gitProfileServices } from "../../services/githubProfiles";
import { useFollowers } from "./useFollowers";

export function useProfiles() {
  const [usersData, setUsersData] = useState<IProfile[]>();
  const [loadingData, setLoadingData] = useState(false);
  const { followersData, loadingFollowers } = useFollowers(usersData);

  const getUserData = async (user: string) => {
    setLoadingData(true);
    setUsersData(undefined);
    try {
      const response = await gitProfileServices.getProfiles(user);
      setUsersData(response.items);
    } catch (error) {
      window.alert(`Error fetching data ${error}`);
    } finally {
      setLoadingData(false);
    }
  };
  return {
    usersData,
    loadingData,
    getUserData,
    followersData,
    loadingFollowers,
  };
}
