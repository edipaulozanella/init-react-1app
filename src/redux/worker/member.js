// by 1app
import { Cloud } from "../../infra";
import md5 from "md5";

export function listar(callback) {
  Cloud.get("member", {}, (res, error) => {
    console.log(res);
    if (callback) callback(res, error);
  });
}

export function criar(data, callback) {
  data.password = md5(data.password + "");
  Cloud.post("member", data, (res, error) => {
    console.log(res);
    if (callback) callback(res, error);
  });
}

export function alterar(data, callback) {
  Cloud.put("member/" + data.id, data, (res, error) => {
    console.log(res);
    if (callback) callback(res, error);
  });
}
