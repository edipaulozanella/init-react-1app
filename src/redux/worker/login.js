import { Cloud } from "../../infra";
import cookie from "react-cookies";
import md5 from "md5";

export function login(login, password, callback) {
  password = md5(password);
  Cloud.get("login/email", { email: login, password: password }, (res, error) => {
    // console.log(res);
    if (!error && res.id) cacheUser(res);
    if (callback) callback(res, error);
  });
}
export function loginFacebook(token, callback) {
  Cloud.get("login/facebook", { token: token }, (res, error) => {
    if (callback) callback(res, error);
  });
}

export function loginGoogle(nome, email, foto, idGoogle, callback) {
  Cloud.get("login/google", { nome, email, foto, idGoogle }, (res, error) => {
    if (callback) callback(res, error);
  });
}

export function loadUser(callback) {
  try {
    var data = cookie.load("reduxUser");
    // user.id = 80
    if (callback && data) callback(data);
  } catch (e) {
    if (callback) callback(null);
  }
}
export function cacheUser(user) {
  try {
    cookie.save("reduxUser", user, {
      path: "/"
    });
  } catch (e) {}
}
