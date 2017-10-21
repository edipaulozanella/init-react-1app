import * as types from "./actionTypes";
import { Query, Model, Cloud } from "../infra";
import cookie from "react-cookies";

let globalStore = null;
let dispatch = null;
export function setStore(store) {
  globalStore = store;
  dispatch = store.dispatch;
}

export function init() {}

export function setUser(user) {
  cookie.save("user", user, {
    path: "/"
  });
  globalStore.dispatch({
    type: "user",
    usuario: user,
    loadUser: false
  });
}
export function loadUser() {
  var state = globalStore.getState();
  var user = cookie.load("user");
  if (user && user.objectId) {
    updateUser(user.objectId, res => {
      if (res && res.objectId) {
        setUser(res);
      } else if (!state.usuario && window.location.pathname != "/login") {
        window.location.href = "/login";
      }
    });
  } else if (!state.usuario && window.location.pathname != "/login") {
    window.location.href = "/login";
  }
}
export function getUser() {
  var state = globalStore.getState();
  return state.usuario;
}
export function updateUser(id, callback) {
  var query = new Query("user_local");
  query.whereEqualTo("_id", id);
  query.first(data => {
    if (data.objectId) {
      callback(data);
    } else {
      callback(false);
    }
  });
}
