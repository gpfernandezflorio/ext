function establecerIdiomaInicio(idioma) {
  document.getElementById('langSelector').hidden = true;
  establecerIdioma(idioma);
  armarSelectorIdioma(idioma);
}

function establecerIdioma(idioma) {
  window.sessionStorage.setItem('selected_lang', idioma);
  actualizarTextos(idioma);
}

function actualizarTextos(lang) {
  if (lang in textos) {
    for (let clase in textos[lang].contenidoClase) {
      let doms = document.getElementsByClassName(clase);
      for (dom of doms) {
        dom.innerHTML = textos[lang].contenidoClase[clase];
      }
    }
    for (let id in textos[lang].contenidoId) {
      let dom = document.getElementById(id);
      if (dom) dom.innerHTML = textos[lang].contenidoId[id];
    }
    for (let id in textos[lang].valorId) {
      let dom = document.getElementById(id);
      if (dom) dom.value = textos[lang].valorId[id];
    }
  }
}

const textos = {
  'es':{
    id:"Español",
    contenidoClase: {
      'index-linkJuego': 'Jugar'
    },
    contenidoId: {
      'juego-titulo-texto': 'Cantidad jugadas:'
    },
    valorId: {
      'botonEmpezar': 'Empezar'
    }
  },
  'en':{
    id:"English",
    contenidoClase: {
      'index-linkJuego': 'Play'
    },
    contenidoId: {
      'juego-titulo-texto': 'Number of plays:'
    },
    valorId: {
      'botonEmpezar': 'Start'
    }
  }
};

function armarSelectorIdioma(i) {
  let langChooser = document.getElementById('langChooser');
  let idiomas = Object.keys(textos);
  let contenidoLangChooser = '';
  for (let j of idiomas) {
    contenidoLangChooser += `<option value="${j}"`;
    if (i==j) {
      contenidoLangChooser += ' selected';
    }
    contenidoLangChooser += `>${textos[j].id}</option>`;
  }
  langChooser.innerHTML = contenidoLangChooser;
  langChooser.hidden = false;
  if (typeof onLoad !== 'undefined') { onLoad(); }
}

function selectorIdioma() {
  let idiomaActual = window.sessionStorage.getItem('selected_lang');
  let langChooser = document.getElementById('langChooser');
  if (langChooser.value != idiomaActual) {
    establecerIdioma(langChooser.value);
  }
}

function run() {
  let div = document.createElement('div');
  div.setAttribute('style', 'position: absolute; top: 10px; margin-right: 0px; right: 20px;');
  document.body.insertBefore(div, document.body.firstChild);
  div.innerHTML = '<select id="langChooser" onchange="selectorIdioma();" hidden></select>';
  let idioma = window.sessionStorage.getItem('selected_lang');
  if (idioma) {
    actualizarTextos(idioma);
    armarSelectorIdioma(idioma);
  } else {
    let div = document.createElement('div');
    div.setAttribute('id', 'langSelector');
    document.body.insertBefore(div, null);
    let idiomas = Object.keys(textos);
    let contenido = '';
    for (let i of idiomas) {
      contenido += `<input class="btn" type="button" onclick="establecerIdiomaInicio('${i}');" value="${textos[i].id}"/>`;
    }
    div.innerHTML = contenido;
    div.hidden = false;
  }
}

window.addEventListener('load', run);
