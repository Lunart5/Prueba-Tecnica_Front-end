import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProfile } from "../../interfaces/github.types";
import { gitProfileServices } from "../../services/githubProfiles";

export function useDetails() {
  const { user } = useParams();
  const [userData, setUserData] = useState<IProfile>();
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const getUSerData = async (user: string) => {
      setLoadingData(true);
      try {        
        const response = await gitProfileServices.getDetails(user);
        setUserData(response);
      } catch (error) {
        window.alert(`Error fetching data ${error}`);
      } finally {
        setLoadingData(false);
      }
    };
    if (user) getUSerData(user);
  }, [user]);

  return { userData, loadingData };
}
