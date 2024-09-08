import { Link } from "react-router-dom";
import { IProfile } from "../../interfaces/github.types";
import "../../styles/card.scss";

interface IProps {
  profileData: IProfile;
}

export default function UserCard({ profileData }: IProps) {
  return (
    <Link to={`/${profileData.login}`} className="profile_card">
      <img className="profile_card__img" src={profileData.avatar_url} />
      <div className="profile_card__item">
        <span>{profileData.login}</span>
      </div>
      <div className="profile_card__item">
        <span>{profileData.id}</span>
      </div>
    </Link>
  );
}
