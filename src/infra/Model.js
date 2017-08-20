
import cookie from 'react-cookie';
var userApp = null;
var host = "";
var token_api = "";


 export default function Model(ent) {
  this.entidade = "dados";
  if (ent) {
    this.entidade = ent;
  }
  this.status = 1;

  Model.prototype.setMetodoApi = function(metodo, tipo) {
    this.metodoApi = metodo ? metodo : "getAll";
    this.metodoTipo = tipo ? tipo : "POST";
  }
  Model.prototype.save = function(retorno) {
    var metodo = "/salvar";
    var url = host + metodo;
    if (this.metodoApi) {
      url = host + "/" + this.metodoApi;
    }
    // console.log(url);
    var saveObject = JSON.parse(JSON.stringify(this))
    delete saveObject.metodoApi;
    delete saveObject.entidade;
    delete saveObject.metodoTipo;

    var send = {
      entidade: this.entidade,
      data: JSON.stringify(saveObject)
    };

    var config = {
      method: this.metodoTipo ? this.metodoTipo : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send)
    };
    if (token_api) {
      config.headers['x-request-id'] = token_api;
    }
    fetch(url, config).then((response) => {
      return response.json()
    }).then((json) => {
      this.up(json);
      if (retorno) {
        retorno(this);
      }
    }).catch((error) => {
      console.log(this);
      console.log(error)
    })
  }
  Model.prototype.up = function(obj, entidade) {
    if (entidade) {
      this.entidade = entidade;
    }
    if (!obj) {
      return this;
    }
    if (obj.objectId) {
      this.objectId = obj.objectId;
    }
    if (obj._id) {
      this._id = obj._id;
    }

    var lista = Object.keys(obj);
    for (var i = 0; i < lista.length; i++) {
      var nome = lista[i];
      var valor = (this)[nome];
      if (!(this)[nome]) {
        (this)[nome] = obj[nome];
      } else if (isArray(valor)) {
        // (this)[nome] = obj[nome] ;
      } else if (isObject(valor)) {
        // (this)[nome] = obj[nome] ;
      } else {
        (this)[nome] = obj[nome];
      }
    }
    if (entidade) {
      this.entidade = entidade;
    }
    return this;
  }

  Model.prototype.update = function(data, retorno) {
    if (!data) {
      if (retorno) {
        retorno();
      }
      return;
    }
    // this.saveing  = true;
    var metodo = "/update";
    if (!data.objectId) {
      data.objectId = this.objectId;
    }
    var url = host + metodo;
    if (this.metodoApi) {
      url = host + "/" + this.metodoApi;
    }
    // console.log(url);
    var saveObject = JSON.parse(JSON.stringify(data))
    delete saveObject.metodoApi;
    delete saveObject.entidade;
    delete saveObject.metodoTipo;

    var send = {
      entidade: this.entidade,
      data: JSON.stringify(saveObject)
    };
 
    var config = {
      method: this.metodoTipo ? this.metodoTipo : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send)
    };
    if (token_api) {
      config.headers['x-request-id'] = token_api;
    }
    fetch(url, config).then((response) => {
      // console.log(response);
      return response.json()
    }).then((json) => {
      if (retorno) {
        retorno(this);
      }
    }).catch((error) => {
      console.log(this);
      console.log(error)
    })
  }

  Model.prototype.parse = function(obj, entidade) {
    if (entidade) {
      this.entidade = entidade;
    }
    if (!obj) {
      return this;
    }
    if (obj.objectId) {
      this.id = obj.objectId;
    }

    var lista = Object.keys(obj);
    for (var i = 0; i < lista.length; i++) {
      var nome = lista[i];
      (this)[nome] = obj[nome];
    }
    if (entidade) {
      this.entidade = entidade;
    }
    return this;
  }

};

Model.setHost = function(url) {
  host = url;
};
Model.setToken = function(token) {
  token_api = token;
};


// module.exports.getCurrentUser = function(retorno) {
//   if (userApp) {
//     if (retorno) {
//       retorno(userApp)
//     }
//     return userApp;
//   }
//   var has = hasUser();
//   if (has) {
//     userApp = has
//     if (retorno) {
//       retorno(userApp)
//     }
//     return userApp;
//   } else {
//     return false;
//   }
// }

// module.exports.criarCurrentUser = function(data) {
//   userApp = new Model();
//   if (data) {
//     userApp.parse(data);
//   }
//   saveUser(data)
//   userApp.entidade = "user_local";
//   userApp.key_user = "current_user";
//   return userApp;
// }

function setCookie(tag, data) {
  try {
    cookie.save(tag, data, {
      path: '/'
    });
  } catch (e) {}
}

function getCookie(tag) {
  return cookie.load(tag);
}

function hasUser() {
  var user = cookie.load('user');
  if (user && user.objectId) {
    return new Model().parse(user, "user_local");
  } else {
    return false;
  }
}

function removerUser() {
  cookie.save('user', false, {
    path: '/'
  });
}

function saveUser(user) {
  cookie.save('user', user, {
    path: '/'
  });
}

function isObject(val) {
  return typeof val === "object";
}

function isArray(object) {
  if (object && JSON.stringify(object) == "[]") {
    return true;
  }
  if (object && object.constructor && object.constructor === Array) {
    return true;
  } else {
    return false;
  }
}

// export default Model;
