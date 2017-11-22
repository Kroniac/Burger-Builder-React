import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalprice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICE = {
  salad: 5,
  cheese: 10,
  bacon: 25,
  meat: 30
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalprice: state.totalprice + INGREDIENT_PRICE[action.ingredientName],
    building: true
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  console.log("Hello2");
  if (state.ingredients[action.ingredientName] >= 1) {
    const updatedIng = {
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    };
    const updatedIngs = updateObject(state.ingredients, updatedIng);
    const updatedSt = {
      ingredients: updatedIngs,
      totalprice: state.totalprice - INGREDIENT_PRICE[action.ingredientName],
      building: true
    };
    return updateObject(state, updatedSt);
  } else return state;
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalprice: 4,
    building: false
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENTS:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENTS:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, { error: true });
    default:
      return state;
  }
};

export default reducer;
