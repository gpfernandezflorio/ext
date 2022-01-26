const LANG = {};

LANG.establecerIdiomaInicio = function(idioma) {
  document.getElementById('langSelector').hidden = true;
  LANG.establecerIdioma(idioma);
  LANG.armarSelectorIdioma(idioma);
};

LANG.establecerIdioma = function(idioma) {
  window.sessionStorage.setItem('selected_lang', idioma);
  LANG.actualizarTextos(idioma);
};

LANG.actualizarTextos = function(lang) {
  if (lang in LANG.textos) {
    LANG.actualizarGrupoTextos(lang, 'contenidoClase', (x) => document.getElementsByClassName(x), function(doms, texto) {
      for (let dom of doms) { dom.innerHTML = texto; }
    });
    LANG.actualizarGrupoTextos(lang, 'contenidoId', (x) => document.getElementById(x),
      function(dom, texto) { dom.innerHTML = texto; });
    LANG.actualizarGrupoTextos(lang, 'valorId', (x) => document.getElementById(x),
      function(dom, texto) { dom.value = texto; });
  }
};

LANG.actualizarGrupoTextos = function(lang, grupo, get, assign) {
  for (let clave in LANG.textos[lang][grupo]) {
    let elemento = get(clave);
    if (elemento) assign(elemento, LANG.textos[lang][grupo][clave]);
  }
};

LANG.textos = {
  'es':{
    id:"Español",
    contenidoClase: {},
    contenidoId: {},
    valorId: {}
  },
  'en':{
    id:"English",
    contenidoClase: {},
    contenidoId: {},
    valorId: {}
  }
};

LANG.agregarTextos = function(textos) {
  for (let idioma in textos) {
    if (idioma in LANG.textos) {
      for (let grupo in textos[idioma]) {
        if (grupo in LANG.textos[idioma]) {
          LANG.textos[idioma][grupo] = Object.assign(LANG.textos[idioma][grupo], textos[idioma][grupo]);
        }
      }
    }
  }
};

LANG.armarSelectorIdioma = function(i) {
  let langChooser = document.getElementById('langChooser');
  let idiomas = Object.keys(LANG.textos);
  let contenidoLangChooser = '';
  for (let j of idiomas) {
    contenidoLangChooser += `<option value="${j}"`;
    if (i==j) {
      contenidoLangChooser += ' selected';
    }
    contenidoLangChooser += `>${LANG.textos[j].id}</option>`;
  }
  langChooser.innerHTML = contenidoLangChooser;
  langChooser.hidden = false;
  if (typeof LANG.onLoad !== 'undefined') { LANG.onLoad(); }
};

LANG.selectorIdioma = function() {
  let idiomaActual = window.sessionStorage.getItem('selected_lang');
  let langChooser = document.getElementById('langChooser');
  if (langChooser.value != idiomaActual) {
    LANG.establecerIdioma(langChooser.value);
  }
};

LANG.inicializar = function(textos, onLoad) {
  if (typeof onLoad !== 'undefined') { LANG.onLoad = onLoad; }
  LANG.agregarTextos(textos);
  let div = document.createElement('div');
  div.setAttribute('style', 'position: absolute; top: 10px; margin-right: 0px; right: 20px;');
  document.body.insertBefore(div, document.body.firstChild);
  div.innerHTML = '<select id="langChooser" onchange="LANG.selectorIdioma();" hidden></select>';
  let idioma = window.sessionStorage.getItem('selected_lang');
  if (idioma) {
    LANG.actualizarTextos(idioma);
    LANG.armarSelectorIdioma(idioma);
  } else {
    let div = document.createElement('div');
    div.setAttribute('id', 'langSelector');
    document.body.insertBefore(div, null);
    let idiomas = Object.keys(LANG.textos);
    let contenido = '';
    for (let i of idiomas) {
      contenido += `<input class="btn" type="button" onclick="LANG.establecerIdiomaInicio('${i}');" value="${LANG.textos[i].id}"/>`;
    }
    div.innerHTML = contenido;
    div.hidden = false;
  }
};
