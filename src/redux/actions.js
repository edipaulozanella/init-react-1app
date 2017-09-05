import * as types from "./actionTypes";
import { Query, Model, Cloud } from "../infra";

let globalStore = null;
export function setStore(store) {
  globalStore = store;
}

export function init() {

}