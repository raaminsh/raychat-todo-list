const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const lists = [];
const tasks = [];
let listId = 1,
  taskId = 1;

app.get("/lists", (req, res) => {
  res.send(lists);
});

app.post("/lists", (req, res) => {
  const { title, description } = req.body;
  const list = { id: listId, title, description };
  lists.push(list);
  listId++;
  res.send(list);
});

app.patch("/lists/:id", (req, res) => {
  const { title, description } = req.body;
  const id = req.params.id;
  const list = lists.find((list) => list.id == id);
  if (!list) {
    res.send(`list with id ${id} is not available`);
  } else {
    if (title) {
      list.title = title;
    }
    if (description) {
      list.description = description;
    }
    res.send(list);
  }
});

app.delete("/lists/:id", (req, res) => {
  const id = req.params.id;
  const index = lists.findIndex((list) => list.id == id);
  if (index == -1) {
    res.send(`list with id ${id} is not available`);
  } else {
    lists.splice(index, 1);
    res.send(`list with id ${id} deleted successfully`);
  }
});

app.post("/lists/:id/tasks", (req, res) => {
  const { description, position } = req.body;
  const listId = req.params.id;
  const index = lists.findIndex((list) => list.id == listId);
  if (index == -1) {
    res.send(`list with id ${listId} is not available`);
  } else {
    const task = {
      id: taskId,
      listId,
      description,
      position,
      status: "undone",
    };
    tasks.push(task);
    taskId++;
    res.send(task);
  }
});

app.patch("/tasks/:id", (req, res) => {
  const { description, position } = req.body;
  const id = req.params.id;
  const task = tasks.find((task) => task.id == id);
  if (!task) {
    res.send(`task with id ${id} is not available`);
  } else {
    if (description) {
      task.description = description;
    }
    if (position) {
      task.position = position;
    }
    res.send(task);
  }
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const index = tasks.findIndex((task) => task.id == id);
  if (index == -1) {
    res.send(`task with id ${id} is not available`);
  } else {
    tasks.splice(index, 1);
    res.send(`task with id ${id} deleted successfully`);
  }
});

app.patch("/tasks/:id/status", (req, res) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id == id);
  if (!task) {
    res.send(`task with id ${id} is not available`);
  } else {
    const previousStatus = task.status;
    task.status = previousStatus == "undone" ? "done" : "undone";
    res.send(task);
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
