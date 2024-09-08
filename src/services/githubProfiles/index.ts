import { IFetchList, IProfile, IReponse } from "../../interfaces/github.types";
import { GET } from "../methods";

export const gitProfileServices = {
  getProfiles: (user: string) => {
    return GET<IReponse<IProfile>>(`search/users?q=${user}&per_page=10`);
  },

  getDetails: (user: string) => {
    return GET<IProfile>(`users/${user}`);
  },

  getFollowers: (list: IFetchList[]) => {
    const fetchPromises = list.map(async (item) => {
      try {
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return { followers: data.length, login: item.userName };
      } catch (error) {
        return { status: "rejected", reason: error, value: null };
      }
    });

    return Promise.allSettled(fetchPromises);
  },
};
