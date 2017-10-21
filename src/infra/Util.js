export function parseCnae(value) {
   var str = value;//"63.11-9-00";
   if(value){
    str = str.replace("-","")
    str = str.replace("-","")
    str = str.replace(".","")
    var res = str.substring(0, str.length-2);
	return parseInt(res)
   }else{
       return value;
   }

}

export function parseMoney(value) {
  value = this.parseNumeroDuasCasas(value);
  if (!value) {
    return "R$ 0,00";
  }
  value = value + "";
  return "R$ " + value.replace(".", ",");
}

export function replaceAll(string, str, key) {
  try {
    if (!string) {
      return "";
    }
    if (!str) {
      return string;
    }
    if (!key) {
      key = "";
    }
    return string.replace(new RegExp(str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g"), key);
  } catch (e) {
    return string;
  }
}

export function parseNumeroDuasCasas(string) {
  if (!string) {
    return 0.0;
  }
  try {
    string = string + "";
    var val = string.replace(",", ".");
    var nnn = parseFloat(val);
    if (!nnn) {
      nnn = 0.0;
    }
    var num = nnn.toFixed(2);
    if (!num || num < 0) {
      num = 0.0;
    }
    return num;
  } catch (e) {
    console.log(e);
    return 0.0;
  }
}

export function web(url) {
  if (!(url.indexOf("http") >= 0) && !(url.indexOf("mailto") >= 0)) {
    url = "http://" + url;
  }
  var win = window.open(url, "_blankFromWebApp");
  if (!(url.indexOf("mailto") >= 0)) {
    win.focus();
  }
}
export function cleanString(s) {
  if (!s) {
    return "";
  }
  var r = s; //.toLowerCase();
  r = r.replace(new RegExp(/\s/g), "");
  r = r.replace(new RegExp(/[àáâãäå]/g), "a");
  r = r.replace(new RegExp(/æ/g), "ae");
  r = r.replace(new RegExp(/ç/g), "c");
  r = r.replace(new RegExp(/[èéêë]/g), "e");
  r = r.replace(new RegExp(/[ìíîï]/g), "i");
  r = r.replace(new RegExp(/ñ/g), "n");
  r = r.replace(new RegExp(/[òóôõö]/g), "o");
  r = r.replace(new RegExp(/œ/g), "oe");
  r = r.replace(new RegExp(/[ùúûü]/g), "u");
  r = r.replace(new RegExp(/[ýÿ]/g), "y");
  r = r.replace(new RegExp(/\W/g), "");
  return r;
}

export function getPartLocation(tag, json) {
  var lista = json.results[0].address_components;
  for (var i = 0; i < lista.length; i++) {
    var item = lista[i];
    if (item.types.indexOf(tag) >= 0) {
      return item.long_name;
    }
  }
}
export function geoLocalizacao(endereco, retorno) {
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(endereco) + "&sensor=true&key=AIzaSyAdBVSO_pMhwOzOvCKtvWPpjVRyFJlh4yI";
  console.log(url);
  getRequest(url, json => {
    if (json.results && json.results[0] && json.results[0].geometry) {
      var address = {};
      if (json.results[0].address_components) {
        address.numero = getPartLocation("street_number", json);
        address.rua = getPartLocation("route", json);
        address.bairro = getPartLocation("sublocality", json);
        address.cidade = getPartLocation("administrative_area_level_2", json);
        address.estado = getPartLocation("administrative_area_level_1", json);
        address.pais = getPartLocation("country", json);
        address.cep = getPartLocation("postal_code", json);
      }
      address.endereco = json.results[0].formatted_address;

      var geometry = json.results[0].geometry;
      if (geometry && geometry.location) {
        retorno(geometry.location.lat, geometry.location.lng, address);
      } else {
        retorno(0, 0);
      }
    } else {
      retorno(0, 0);
    }
  });
}
export function getRequest(url, retorno, backErro) {
  // fetch('/package.json').then(function(response) {
  //   return response.json()
  // }).then(function(json) {
  //   console.log('parsed json', json)
  // }).catch(function(ex) {
  //   console.log('parsing failed', ex)
  // })
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // console.log('parsed json', json)
      retorno(json);
    })
    .catch(function(error) {
      if (backErro) {
        backErro(error);
      }
    });
}
