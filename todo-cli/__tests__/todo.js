/* eslint-disable no-undef */

const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodolList Test Suite", () => {
  //TEST 1
  test("Should add new todo", () => {
    expect(all.length).toBe(0);
    add({
      title: "Test Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });
    expect(all.length).toBe(1);
  });

  //TEST 2
  test("Should mark todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  //TEST 3
  test("Should check retrieval of overdue todos", () => {
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Overdue",
      dueDate: "2023-01-01",
      completed: false,
    });
    expect(overdue().length).toBe(1);
    expect(overdue()[0].dueDate < today).toBe(true);
  });
  //TEST 4
  test("Check retrieval of todos due today", () => {
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Due Today",
      dueDate: today,
      completed: false,
    });
    expect(dueToday()[0].dueDate === today).toBe(true);
  });

  //TEST 5
  test("Check retrieval of todos due later", () => {
    const today = new Date().toISOString().split("T")[0];
    add({
      title: "Due Later",
      dueDate: "2026-06-01",
      completed: false,
    });

    expect(dueLater()[0].dueDate > today).toBe(true);
  });
});
