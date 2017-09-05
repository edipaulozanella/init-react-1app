"use strict";
import Model from './Model.js';
var host = "";
var token_api = "";


export default class Query {
  constructor(entidade) {
    this.entidade = entidade ? entidade : "dados";
    this.sql = {};
    this.sql_direto = "";
    this.limit = 1000;
    this.ordem = {};
    this.whereServer = null;
    // console.log(this)

  }



  whereNotEqualTo(key, value) {
    if (key) {
      this.sql[key] = {
        "$ne": value
      };
    }
  }

  whereEqualTo(key, value) {
    if (key) {
      this.sql[key] = value;
    }
  }

  whereGreaterThanOrEqualTo(key, value) {
    if (key) {
      this.sql[key] = {
        "$gte": value
      };
    }
  }

  whereLessThanOrEqualTo(key, value) {
    if (key) {
      this.sql[key] = {
        "$lte": value
      };
    }
  }
  whereGreaterThan(key, value) {
    if (key) {
      this.sql[key] = {
        "$gt": value
      };
    }
  }

  whereExists(key) {
    if (key) {
      this.sql[key] = {
        "$exists": true
      };
    }
  }
  whereLessThan(key, value) {
    if (key) {
      this.sql[key] = {
        "$lt": value
      };
    }
  }
  whereNotExists(key) {
    if (key) {
      this.sql[key] = {
        "$exists": false
      };
    }
  }

  whereDoesNotExist(key) {
    if (key) {
      this.sql[key] = {
        "$exists": false
      };
    }
  }

  whereContains(key, value) {
    if (key) {
      this.sql[key] = {
        $regex: value,
        $options: 'i'
      };
    }
  } //'$not'

  whereNotContains(key, value) {
    if (key) {
      this.sql[key] = {
        '$not': {
          $regex: value,
          $options: 'i'
        }
      };
    }
  }

  addAscendingOrder(key) {
    if (key) {
      this.ordem[key] = 1;
    }
  }
  addDescendingOrder(key) {
    if (key) {
      this.ordem[key] = -1;
    }
  }

  setLimit(limit) {
    this.limit = limit;
  }


  setMetodoApi(metodo, tipo) {
    this.metodoApi = metodo ? metodo : "getAll";
    this.metodoTipo = tipo ? tipo : "POST";
  }

  getSql() {
    return this.sql;
  }
  sinc(retorno) {
    // console.log("sinc");
    var where = this.getSql();
    if (!where.status) {
      where.status = 1;
    }
    if (this.whereServer) {
      where = this.whereServer;
    }
    var send = {
      entidade: this.entidade,
      where: where,
      ordem: this.ordem,
      limit: this.limit
    };

    var url = host + "/getAll";
    if (this.metodoApi) {
      url = host + "/" + this.metodoApi;
    }

    var config = {
      method: this.metodoTipo ? this.metodoTipo : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send)
    };

    if (token_api) {
      config.headers['x-request-id'] = token_api + "";
    }
    // console.log(config);
    // console.log(url);
    fetch(url, config).then((response) => {
      // console.log(response);
      try {
        return response.json()
      } catch (e) {
        console.log(e);
        return [];
      }
    }).then((results) => {
      var lista = [];
      for (var i = 0; i < results.length; i++) {
        var item = results[i];
        lista.push(new Model().parse(item, this.entidade));
      }
      if (retorno) {
        retorno(lista);
      }
    }).catch((error) => {
      console.log(error, this);
      if (retorno) {
        retorno([]);
      }
    })
  }

  first(retorno, direto) {
    this.sinc((lista) => {
      if (retorno) {
        if (lista[0]) {
          retorno(lista[0]);
        } else {
          retorno(new Model(this.entidade));
        }
      }
    });
  }


  firstCloud(retorno, direto) {
    this.sinc((lista) => {
      if (retorno) {
        if (lista[0]) {
          retorno(lista[0]);
        } else {
          retorno(new Model(this.entidade));
        }
      }

    });
  }

  select(retorno, direto) {
    this.sinc(retorno);
  }
  cloud(retorno, direto) {
    this.sinc(retorno);
  }

}


Query.setToken = function(token) {
  token_api = token;
}
Query.setHost = function(url) {
  host = url;
}


