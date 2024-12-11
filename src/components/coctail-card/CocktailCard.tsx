import React, { Suspense, useMemo } from "react";
import { CocktailCardType } from "./types";

import s from "./CocktailCard.module.scss";
import Skeleton from "../skeleton";
import LazyImage from "../lazy-image/LazyImage";

const CocktailCard = ({
  strDrink,
  strCategory,
  strAlcoholic,
  strGlass,
  strInstructions,
  strDrinkThumb,
  ...otherProps
}: CocktailCardType) => {
  const { ingredients, measure } = useMemo(() => {
    const ingredients: string[] = [];
    const measure: string[] = [];

    Object.entries(otherProps).forEach(([key, value]) => {
      if (key.startsWith("strIngredient")) ingredients.push(value as string);
      if (key.startsWith("strMeasure")) measure.push(value as string);
    });

    return { ingredients, measure };
  }, [otherProps]);

  return (
    <div className={s.root}>
      <div className={s.content}>
        <h1 className={s.title}>{strDrink}</h1>
        <div>{strCategory}</div>
        <div>{strAlcoholic}</div>
        <div>{strGlass}</div>
        <div className={s.instructions}>
          <h4>Instructions</h4>
          <div>{strInstructions}</div>
        </div>
        <div className={s.list}>
          <h4>List of ingredients:</h4>
          <table>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index}>
                  <td>{ingredient}</td>
                  <td>{measure[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={s.image}>
        <Suspense fallback={<Skeleton />}>
          <LazyImage
            src={strDrinkThumb}
            alt={strDrink}
            skeleton={<Skeleton />}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default CocktailCard;
