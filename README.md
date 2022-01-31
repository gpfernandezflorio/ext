# Archivos:

## lang.js

Paquete para presentar un selector de idioma antes y durante la ejecución de un juego o actividad.

### Funcionamiento

Al cargar, si no hay ningún idioma seleccionado, muestra un botón por cada idioma posible.
Al seleccionar uno de estos botones se asigna el idioma elegido (para esto se usa el sessionStorage) y se procede a mostrar la página principal.
Durante el resto de la actividad se muestra un selector dropdown con los mismos idiomas.

### Para incorporarlo a una página

Para que quede bien, la página debería estar completamente oculta.
Para eso se puede crear una div principal con el atributo hidden y poner todo el contenido dentro.
Para invocar al paquete, se debe ejecutar un script que, al terminar de cargar la página, ejecute la función LANG.inicializar.
Esta función toma dos parámetros. El primero debe ser un objeto con los textos traducibles en la página.
El segundo es opcional y corresponde a la función que se ejecutará cuando el usuario seleccione un idioma (idealmente, esta función mostraría la div oculta).

Ejemplo:

<script type="text/javascript">
  function onLoad() {
    document.getElementById('main').hidden = false;
  };
  window.addEventListener('load', function() {
    LANG.inicializar({}, onLoad);
  });
</script>

Nota: Para evitar posibles conflictos de nombres, se recomienda que todas las variables y funciones estén definidas dentro de un único objeto. En el caso de este paquete, el nombre de ese objeto es _LANG_.

### Formato del objeto con los textos traducibles

El objeto debe tener un campo por cada idioma válido ('es', 'en', ...).
El valor de cada uno de estos debe ser otro objeto que puede contener los siguientes campos: contenidoClase, contenidoId, valorId.
En cada uno de esos campos se debe definir otro objeto que asocie pares de textos, donde la clave es una clase (para el primero) o un id (para los otros dos) y el significado es el texto traducido que se le debe asignar al contenido innerHTML (para los primeros dos) o al campo 'value' (para el tercero) del elemento que coincida con la clave.

En el siguiente ejemplo se define que el contenido innerHTML de todos los elementos con clase 'index-linkJuego' debe ser 'Jugar' en español y 'Play' en inglés. Además, el valor (campo 'value') del elemento con id 'botonEmpezar' debe ser 'Empezar' en español y 'Start' en inglés.

const textos = {
  'es':{
    contenidoClase: {'index-linkJuego': 'Jugar'},
    valorId: { 'botonEmpezar': 'Empezar' }
  },
  'en':{
    contenidoClase: {'index-linkJuego': 'Play'},
    valorId: { 'botonEmpezar': 'Start' }
  }
};

## settings.js

Paquete para armar un menú de configuración.

### Funcionamiento

Se debe invocar a la función _Settings.menu_ que toma el id de una div donde incrustar el menú y una lista de los elementos del menú.

### Formato de los elementos del menú

Cada elemento en la lista pasada como segundo argumento de _Settings.menu_ debe ser un objeto.

COMPELTAR...

## server.py

TODO

## event.js

TODO
