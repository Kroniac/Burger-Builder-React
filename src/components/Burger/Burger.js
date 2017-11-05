import React from "react";
import classes from "./Burger.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(Key => {
      return [...Array(props.ingredients[Key])].map((_, i) => {
        return <BurgerIngredients key={Key + i} type={Key} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>{props.message}</p>;
  }
 
  return (
    <div className={classes.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
};

export default burger;
