import { useDetails } from "../../components/hooks/useDetails";
import LoadingWrapper from "../../components/loading";
import "../../styles/profileDetails.scss"

export default function UserDetails() {
  const { loadingData, userData } = useDetails();

  return (
    <div className="container">
      <div className="user_container_title">
        <h1>Detalles del perfil</h1>
      </div>
      <div className="user_details_container">
        <LoadingWrapper isLoading={loadingData}>
          <div className="user_details_container__data">
            <img src={userData?.avatar_url} />
            <h2>{userData?.login}</h2>

            <div className="user_details_container__item">
              <div>
                <a href={userData?.html_url} target="_blank">
                  Ver en Github
                </a>
              </div>
            </div>
            <div className="user_details_container__item">
              <div>
                <span>Seguidores: {userData?.followers}</span>
              </div>
              <div>
                <span>Repositorios: {userData?.public_repos}</span>
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </div>
  );
}
