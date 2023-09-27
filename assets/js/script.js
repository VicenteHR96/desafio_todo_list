const tareas = [];
const alerta = document.querySelector("#alerta");
const idList = document.querySelector("#id-list");
const tareaList = document.querySelector("#tarea-list");
const realizadasList = document.querySelector("#realizadas-list");
const eliminarList = document.querySelector("#eliminar-list");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");
let siguienteId = 1;

//Agregar tarea

const agregarTarea = () => {
  const inputTarea = document.querySelector("#input-tarea");
  if (inputTarea.value == "") {
    alerta.innerHTML = "Agregue alguna tarea.";
  } else {
    alerta.innerHTML = "";
    const nuevaTarea = {
      id: siguienteId++,
      nombreTarea: inputTarea.value,
      checked: "",
    };
    tareas.push(nuevaTarea);
    actualizarLista();
    inputTarea.value = "";
  }
};

//Actualizar lista

const actualizarLista = function () {
  let htmlElementoId = "";
  for (let tarea of tareas) {
    htmlElementoId += `<li>${tarea.id}</li>`;
  }
  idList.innerHTML = htmlElementoId;

  let htmlElementoTarea = "";
  for (let tarea of tareas) {
    htmlElementoTarea += `<li>${tarea.nombreTarea}</li>`;
  }
  tareaList.innerHTML = htmlElementoTarea;

  let htmlElementoRealizadas = "";
  for (let tarea of tareas) {
    htmlElementoRealizadas += `<li><input type="checkbox" class="checkbox" id="checkbox_${tarea.id}"></li>`;
  }
  realizadasList.innerHTML = htmlElementoRealizadas;

  let htmlElementoEliminar = "";
  for (let tarea of tareas) {
    htmlElementoEliminar += `<li><i class="fa-solid fa-circle-minus fa-xs" style="color: #ff0000;" onClick="eliminarTarea(${tarea.id})"></i></li>`;
  }
  eliminarList.innerHTML = htmlElementoEliminar;

  total.innerHTML = tareas.length;
  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      actualizarRealizadas();
    });
  });
};

//Eliminar tarea

const eliminarTarea = function (id) {
  const posicion = tareas.findIndex((tarea) => tarea.id == id);
  tareas.splice(posicion, 1);
  actualizarLista();
};

actualizarLista();

//Contador

// Actualizar contador de tareas realizadas
const actualizarRealizadas = () => {
  const checkboxes = document.querySelectorAll(".checkbox");
  let tareasRealizadas = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      tareasRealizadas++;
    }
  });
  realizadas.innerHTML = tareasRealizadas;
};

actualizarLista();
