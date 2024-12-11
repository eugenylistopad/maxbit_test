import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchCocktail } from "../../store/cocktailsSlice";

import CocktailCard from "../coctail-card/CocktailCard";
import Menu from "../menu";

import s from "./CocktailCards.module.scss";

const CocktailCards = () => {
  const navigate = useNavigate();
  const { cocktailCode } = useParams<{ cocktailCode: string }>();
  const dispatch: AppDispatch = useDispatch();

  const cocktail = useSelector(
    (state: RootState) => state.cocktails.data[cocktailCode || ""]
  );
  const loading = useSelector((state: RootState) => state.cocktails.loading);

  useEffect(() => {
    if (cocktailCode && !cocktail) {
      dispatch(fetchCocktail(cocktailCode));
    }
  }, [cocktailCode, dispatch, cocktail]);

  useEffect(() => {
    if (cocktailCode && !loading && cocktail === null) {
      navigate("/not-found", { replace: true });
    }
  }, [cocktailCode, cocktail, loading, navigate]);

  if (loading) {
    return <div className={s.loading}>Loading...</div>;
  }

  return (
    <div className={s.root}>
      <Menu />
      <div>
        {cocktail &&
          cocktail.map((card) => {
            return <CocktailCard key={card.idDrink} {...card} />;
          })}
      </div>
    </div>
  );
};

export default CocktailCards;
