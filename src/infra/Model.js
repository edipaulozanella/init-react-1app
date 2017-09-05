
import cookie from 'react-cookie';
var userApp = null;
var host = "";
var token_api = "";

export default class Model {
  constructor(entidade) {
    this.entidade = "dados";
    if (entidade) {
      this.entidade = entidade;
    }
    this.status = 1;
  // console.log(this) 
  }

  setMetodoApi(metodo, tipo) {
    this.metodoApi = metodo ? metodo : "getAll";
    this.metodoTipo = tipo ? tipo : "POST";
  }


  save(retorno) {
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
      if (retorno) {
        retorno(this);
      }
      console.log(this);
      console.log(error)
    })
  }

  up(obj, entidade) {
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
      } else if (Model.isArray(valor)) {
        // (this)[nome] = obj[nome] ;
      } else if (Model.isObject(valor)) {
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

  update(data, retorno) {
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


  parse(obj, entidade) {
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


  delete(callback) {
    var metodo = "/delete";
     
    var url = host + metodo;
    if (this.metodoApi) {
      url = host + "/" + this.metodoApi;
    }
    // console.log(url);
  
    var send = {
      entidade: this.entidade,
      data: JSON.stringify({objectId:this.objectId,_id:this._id})
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
    fetch(url, config).then((json) => {
      if (callback) {
        callback(this);
      }
    }).catch((error) => {
      console.log(this);
      console.log(error)
    })
  }

}
Model.setHost = function(url) {
  host = url;
};
Model.setToken = function(token) {
  token_api = token;
};





Model.setCookie = function(tag, data) {
  try {
    cookie.save(tag, data, {
      path: '/'
    });
  } catch (e) {}
}

Model.getCookie = function(tag) {
  return cookie.load(tag);
}

Model.hasUser = function() {
  var user = cookie.load('user');
  if (user && user.objectId) {
    return new Model().parse(user, "user_local");
  } else {
    return false;
  }
}

Model.removerUser = function() {
  cookie.save('user', false, {
    path: '/'
  });
}

Model.saveUser = function(user) {
  cookie.save('user', user, {
    path: '/'
  });
}

Model.isObject = function(val) {
  return typeof val === "object";
}

Model.isArray = function(object) {
  if (object && JSON.stringify(object) == "[]") {
    return true;
  }
  if (object && object.constructor && object.constructor === Array) {
    return true;
  } else {
    return false;
  }
}

