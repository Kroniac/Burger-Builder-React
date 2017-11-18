import * as actionTypes from "../actions/actionTypes";

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
      console.log("Hello");
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalprice: state.totalprice + INGREDIENT_PRICE[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENTS:
      console.log("Hello2");
      if (state.ingredients[action.ingredientName] >= 1)
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredientName]:
              state.ingredients[action.ingredientName] - 1
          },
          totalprice: state.totalprice - INGREDIENT_PRICE[action.ingredientName]
        };
      else return state;

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      console.log("Hello3");
      return state;
  }
};

export default reducer;
