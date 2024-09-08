import "../../styles/loadingWrapper.scss";
interface IProps {
  isLoading: boolean;
  children: JSX.Element | null;
}
export default function LoadingWrapper({ children, isLoading }: IProps) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <span>Cargando...</span>
      </div>
    );
  } else if (children) {
    return children;
  } else {
    return null;
  }
}
