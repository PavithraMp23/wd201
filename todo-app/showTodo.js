// showTodos.js
const { Todo } = require("./models");

async function showTodos() {
  const todos = await Todo.findAll(); // or with condition: { where: { completed: false } }
  console.log("Your Todos:\n", JSON.stringify(todos, null, 2));
}

showTodos();
