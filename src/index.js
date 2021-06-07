// <⚠️ DONT DELETE THIS ⚠️>
import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const form = document.querySelector(".js-toDoForm"),
  input = form.querySelector("input"),
  list = document.querySelector(".js-list"),
  pList = document.querySelector(".js-pending__list"),
  fList = document.querySelector(".js-finished__list");

const P_TODOS_LS = "PENDING",
  F_TODOS_LS = "FINISHED";

let toDos1 = [];
let toDos2 = [];

function penToDo(event) {
  delToDo(event);
}

function delToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  list.removeChild(li);
  const cleanToDos = toDos1.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos1 = cleanToDos;
  saveToDo1();
}

function saveToDo1() {
  localStorage.setItem(P_TODOS_LS, JSON.stringify(toDos1));
}

function paintToDo1(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const penBtn = document.createElement("button");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", delToDo);
  penBtn.innerText = "✅";
  penBtn.addEventListener("click", penToDo);
  const span = document.createElement("span");
  const newId = crypto.getRandomValues(new Uint32Array(1))[0];
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(penBtn);
  li.id = newId;
  pList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  console.log(toDoObj);
  toDos1.push(toDoObj);
  saveToDo1();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintToDo1(currentValue);
  input.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(P_TODOS_LS, F_TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo1(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  form.addEventListener("submit", handleSubmit);
}

init();
