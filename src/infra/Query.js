import Model from './Model.js';
var host = "";
var token_api = "";
export default function Query(entidade){
  this.entidade = entidade? entidade: "dados";
  this.sql = {};
  this.sql_direto = "";
  this.limit = 1000;
  this.ordem = {};
  this.whereServer = null;

  Query.prototype.setWhereServer = function (value){
    this.whereServer = value;
  }
  Query.prototype.setEntidade = function (value){
    this.entidade = value;
  }

  Query.prototype.setSqlDireto = function (sql){
    this.sql_direto = sql;
  }


  Query.prototype.whereNotEqualTo = function (key, value){
    //{ "children" : { "$not" : {"$size":1 } } }
    if ( key){
      this.sql[key] =  { "$ne" : value};
    }
  }

  Query.prototype.whereEqualTo = function (key, value){
    if ( key){
      this.sql[key] = value;
    }
  }

  Query.prototype.whereGreaterThanOrEqualTo = function (key, value){
    if ( key){
      this.sql[key] = {"$gte": value};
    }
  }

  Query.prototype.whereGreaterThan = function (key, value){
    if ( key){
      this.sql[key] = {"$gt": value};
    }
  }

  Query.prototype.whereLessThanOrEqualTo = function (key, value){
    if ( key){
      this.sql[key] = {"$lte": value};
    }
  }



  Query.prototype.whereLessThan = function (key, value){
    if ( key){
      this.sql[key] = {"$lt": value};
    }
  }

  Query.prototype.whereExists = function (key){
    if ( key){
      this.sql[key] =  {"$exists": true};
    }
  }
  Query.prototype.whereNotExists = function (key){
    if ( key){
      this.sql[key] =  {"$exists": false};
    }
  }
  
  
  Query.prototype.whereDoesNotExist = function (key){
    if ( key){
      this.sql[key] =  {"$exists": false};
    }
  }

  Query.prototype.whereContains = function (key, value){
    if (key  ){
      this.sql[key] =   { $regex: value, $options: 'i' }  ;
    }
  }//'$not'
  Query.prototype.whereNotContains = function (key, value){
    if (key  ){
      this.sql[key] = {'$not':  { $regex: value, $options: 'i' } } ;
    }
  }
  Query.prototype.addAscendingOrderNumerica = function (key){
    if ( key){
      this.ordem[key]=1;
    }
  }
  Query.prototype.addDescendingOrderNumerica = function (key){
    if ( key){
      this.ordem[key]=-1;
    }
  }
  Query.prototype.addAscendingOrder = function (key){
    if ( key){
      this.ordem[key]=1;
    }
  }

  Query.prototype.addDescendingOrder = function (key){
    if ( key){
      this.ordem[key]=-1;
    }
  }

  Query.prototype.setLimit = function (limit){
    this.limit = limit;
  }

  Query.prototype.whereNear = function (latitude,longitude,maxDistance){


    // var teste =  {
    //   point: {
    //     $geoWithin:       { $center: [ [-29.163,-51.179], 5000 ] }
    //   }
    // }
    // {"point":{"$nearSphere":{"$geometry":{"type":"Point","coordinates":[-29.163,-51.179]}}}}

    // console.log(JSON.stringify(teste));
    try {
      if(!this.whereServer){
        this.whereServer ={};
      }
      this.whereServer.point = {
        $nearSphere : {
          $geometry : {
            type : "Point" ,
            coordinates : [latitude,  longitude]
          }
          // , $maxDistance : 1000
        }
      };
      console.log(JSON.stringify(this.whereServer));
      // console.log(this);
      if(maxDistance){
        this.whereServer.point.$nearSphere.$maxDistance = maxDistance;
      }
      // console.log(this);
    } catch (e) {
      console.log(e);
    }
  }

  Query.prototype.getSql = function (){
    return this.sql;
  }

  Query.prototype.setMetodoApi = function (metodo,tipo){
    this.metodoApi = metodo ? metodo : "getAll";
    this.metodoTipo = tipo? tipo : "POST";
  }

  Query.prototype.sinc = function (retorno){
    // console.log("sinc");
    var  where =  this.getSql();
    if(!where.status){
      where.status =1;
    }
    if(this.whereServer){
      where = this.whereServer;
    }
    var send = {entidade:this.entidade,where:where,ordem:this.ordem,limit:this.limit};

    var url =host+"/getAll";
    if(this.metodoApi){
      url =host+"/"+this.metodoApi;
    }

    var config = {
      method: this.metodoTipo ? this.metodoTipo : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send)
    };

    if(token_api){
      config.headers['x-request-id'] = token_api+"";
    }
    // console.log(config);
    // console.log(url);
    fetch(url, config).then((response)=> {
      // console.log(response);
      try {
        return response.json()
      } catch (e) {
        console.log(e);
        return [];
      }
    }).then((results) =>{
      var lista =[];
      for (var i = 0; i < results.length; i++) {
        var item =   results[i];
        lista.push(new Model().parse(item,this.entidade));
      }
      if(retorno){
        retorno(lista);
      }
    }).catch((error) =>{
      console.log(error,this);
      if(retorno){
        retorno([]);
      }
    })
  }

  Query.prototype.select = function (retorno,direto){
    this.sinc(retorno);
  }
  Query.prototype.cloud = function (retorno,direto){
    this.sinc(retorno);
  }
  Query.prototype.first = function (retorno,direto){
    this.sinc((lista)=>{
      if(retorno){
        if(lista[0]){
        retorno(lista[0]);
      }else{
        retorno(new Model(this.entidade));
      }
      }
    });
  }
  Query.prototype.firstCloud = function (retorno,direto){
    this.sinc((lista)=>{
      if(retorno){
        if(lista[0]){
        retorno(lista[0]);
      }else{
        retorno(new Model(this.entidade));
      }
      }
      
    });
  }


};

Query.setToken = function(token){
  token_api = token;
}
Query.setHost = function(url){
  host = url;
}


// export default Query;
