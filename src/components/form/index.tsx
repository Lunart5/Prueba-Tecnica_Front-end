import React from "react";
import "../../styles/form.scss";

interface IProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function FormComponent({ handleSubmit }: IProps) {
  return (
    <header>
      <div className="title">
        <h1 id="title">Buscar en Github</h1>
      </div>
      <form onSubmit={handleSubmit} className="form" data-testid="form">
        <div className="search-container">
          <input
            className="search_container__input"
            name="username"
            placeholder="Buscar"
            minLength={4}
            title="iseijasunow no es permitido. Prueba con otro usuario"
            pattern="^(?!.*\biseijasunow\b).*$"
            autoComplete="off"
            autoFocus
          />
          <button className="search_container__btn">Buscar</button>
        </div>
      </form>
    </header>
  );
}
