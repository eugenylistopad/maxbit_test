import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import s from "./Menu.module.scss";

const Menu: React.FC = () => {
  const cocktailList = useSelector(
    (state: RootState) => state.cocktails.cocktailList,
  );

  return (
    <nav className={s.root}>
      <ul className={s.list}>
        {cocktailList.map((cocktail) => (
          <li key={cocktail} className={s.item}>
            <NavLink
              to={`/${cocktail}`}
              className={({ isActive }) => (isActive ? s.active : "")}
            >
              {cocktail}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
