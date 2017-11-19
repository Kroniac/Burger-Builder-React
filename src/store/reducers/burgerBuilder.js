import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalprice: 4,
  error: false
};

const INGREDIENT_PRICE = {
  salad: 5,
  cheese: 10,
  bacon: 25,
  meat: 30
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      };
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient
      );
      const updatedState = {
        ingredients: updatedIngredients,
        totalprice: state.totalprice + INGREDIENT_PRICE[action.ingredientName]
      };
      return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENTS:
      console.log("Hello2");
      if (state.ingredients[action.ingredientName] >= 1) {
        const updatedIng = {
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        };
        const updatedIngs = updateObject(state.ingredients, updatedIng);
        const updatedSt = {
          ingredients: updatedIngs,
          totalprice: state.totalprice - INGREDIENT_PRICE[action.ingredientName]
        };
        return updateObject(state, updatedSt);
      } else return state;

    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalprice: 4
      });

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });

    default:
      console.log("Hello3");
      return state;
  }
};

export default reducer;
