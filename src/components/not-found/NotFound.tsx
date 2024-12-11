import React from "react";

import { NavLink } from "react-router-dom";

import s from "./NotFound.module.scss";

const NotFound: React.FC = () => {
  return (
    <div className={s.root}>
      <h1 className={s.title}>404</h1>
      <p className={s.text}>Такой страницы не существует.</p>
      <NavLink to="/" className={s.link}>
        Вернуться на главную
      </NavLink>
    </div>
  );
};

export default NotFound;
