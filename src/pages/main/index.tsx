import React from "react";
import UserCard from "../userCard";
import { useProfiles } from "../../components/hooks/useProfiles";
import ChartComponent from "../../components/barChart";
import FormComponent from "../../components/form";
import LoadingWrapper from "../../components/loading";
import '../../styles/main.scss'

export default function MainPageView() {
  const {
    getUserData,
    loadingData,
    usersData,
    followersData,
    loadingFollowers,
  } = useProfiles();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const userName = data.get("username")?.toString();

    if (!userName || userName.length < 4 || userName === "iseijasunow") {
      return;
    } else {
      getUserData(userName);
    }
  };

  return (
    <div className="container">
      <FormComponent handleSubmit={handleSubmit} />

      <LoadingWrapper isLoading={loadingData}>
        {usersData?.length === 0 ? (
          <div className="no-results">
            <span>No hay resultados para esta busqueda</span>
          </div>
        ) : (
          <div className="cards-container">
            {usersData?.map((item) => (
              <UserCard profileData={item} key={item.id} />
            ))}
          </div>
        )}
      </LoadingWrapper>

      <LoadingWrapper isLoading={loadingFollowers}>
        {followersData && followersData?.length > 0 ? (
          <ChartComponent data={followersData} title="Seguidores por usuario" />
        ) : null}
      </LoadingWrapper>
    </div>
  );
}
