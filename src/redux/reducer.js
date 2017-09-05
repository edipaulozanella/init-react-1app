import * as types from "./actionTypes";

export default function app(state = {}, action = {}) {
  switch (action.type) {
    case types.LOGOUT:
      delete state.user;
      return state;

    default:
      if (action.type && action.value) {
        state[action.type] = action.value;
      } else {
        var list = Object.keys(action);
        for (var i = 0; i < list.length; i++) {
          state[list[i]] = action[list[i]];
        }
      }
      return state;
  }
}
