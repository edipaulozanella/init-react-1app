import * as types from "./actionTypes";
 
export default function app(state = {}, action = {}) {
  state.user = {objectId:1,name:"Ediapulo Zanella"};
 
 
  switch (action.type) {
    case types.GET_ALL_RATES:
      return state;

    default:
      if (action.types) {
        state[action.types] = action.value;
      }
      return state;
  }
}
