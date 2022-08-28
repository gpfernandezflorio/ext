const Settings = {};

Settings.elemento = function(setting) {
  let contenido = '';
  if (setting.dependencias) {
    let id;
    if (setting.id) {
      id = setting.id;
    } else {
      id = Settings.generarId();
      contenido += ` id="${id}"`;
    }
    for (let dependencia in setting.dependencias) {
      if (!(dependencia in Settings.dependencias)) {
        Settings.dependencias[dependencia] = {};
      }
      Settings.dependencias[dependencia][id] = setting.dependencias[dependencia];
    }
  }
  if (setting.id) {
    contenido += ` id="${setting.id}"`;
  }
  if (setting.class) {
    contenido += ` class="${setting.class}"`;
  }
  if (setting.value) {
    contenido += ` value="${setting.value}"`;
  }
  return contenido;
};

Settings.menu = function(div_id, settings, additional_options={}) {
  Settings.dependencias = {};
  let contenido = '<table>';
  for (let setting of settings) {
    if (additional_options.defaultClass && !(setting.class)) {
        setting.class = additional_options.defaultClass;
    }
    contenido += '<tr>';
    contenido += '<td';
    contenido += Settings.elemento(setting);
    contenido += '></td>';
    if (setting.valor) {
      let valor = setting.valor;
      contenido += '<td';
      contenido += Settings.elemento(valor);
      contenido += '>';
      if (valor.campo) {
        let campo = valor.campo;
        let contenidoCampo = Settings.elemento(campo);
        if (campo.opciones == "texto") {
          contenido += '<input type="text"' + contenidoCampo + '>';
        } else if (campo.opciones == "numero") {
          if (campo.min) {
            contenidoCampo += ` min="${campo.min}"`;
          }
          if (campo.max) {
            contenidoCampo += ` max="${campo.max}"`;
          }
          contenido += '<input type="number"' + contenidoCampo + '>';
        } else if (campo.opciones == "bool") {
          // TODO
        } else if (Array.isArray(campo.opciones)) {
          contenido += '<select' + contenidoCampo + '>';
          for (let opcion of campo.opciones) {
            let contenidoOpcion = Settings.elemento(opcion);
            if (
              (campo.defectoId && opcion.id && opcion.id == campo.defectoId) ||
              (campo.defectoClass && opcion.class && opcion.class == campo.defectoClass)
            ) {
              contenidoOpcion += ' selected';
            }
            contenido += '<option' + contenidoOpcion + '></option>';
          }
          contenido += '</select>';
        }
      }
      contenido += '</td>';
    }
    contenido += '</tr>';
  }
  document.getElementById(div_id).innerHTML = contenido + '</table>';
  if (typeof LANG !== 'undefined') { LANG.actualizarTextos(); }
  Settings.controlarDependencias();
};

Settings.controlarDependencias = function() {
  for (let dependencia in Settings.dependencias) {
    const dependientes = Settings.dependencias[dependencia]
    document.getElementById(dependencia).onchange = function() {
      let esteValor = document.getElementById(dependencia).value;
      for (let dependiente in dependientes) {
        document.getElementById(dependiente).hidden = esteValor != dependientes[dependiente];
      }
    }
  }
  delete Settings.dependencias;
};

Settings.generarId = function() {
  let n = Settings.ultimoId || 1;
  nuevoId = `_harcodedId_${n}`;
  Settings.ultimoId = n+1;
  return nuevoId;
};
