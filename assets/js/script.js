const tareas = [];
const alerta = document.querySelector("#alerta");
const rows = document.querySelector(".rows");
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
  let htmlElementoRows = "";
  for (let tarea of tareas) {
    htmlElementoRows += `
    <div class="id-rows">${tarea.id}</div>
    <div class="tarea-rows">${tarea.nombreTarea}</div>
    <div class="realizada-rows"><input type="checkbox" class="checkbox" id="checkbox_${tarea.id}"></div>
    <div class="eliminar-rows"><i class="fa-solid fa-circle-minus fa-xs" style="color: #ff0000;" onClick="eliminarTarea(${tarea.id})"></i></div>
  `;
  }
  rows.innerHTML = htmlElementoRows;

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
