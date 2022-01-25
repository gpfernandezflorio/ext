EVENT = ""
//EVENT = "Feria del Libro"
//EVENT = "Semana de la Computación"
//EVENT = "Noche de los Museos"

END = "Exactas - Departamento de Computación"

var today = new Date();
var year = today.getFullYear();

document.write('\
\
<div id="event">\
<div><font size="5">'+END+'</font></div>\
<div style="float:right"><font size="5">'+EVENT+' '+year+'</font></div>\
</div>\
\
');
