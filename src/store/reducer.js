import * as actionTypes from "./action";

const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    salad: 0,
    meat: 0
  },
  totalprice: 4
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
    default:
      console.log("Hello3");
      return state;
  }
};

export default reducer;
