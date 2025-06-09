
const todoList = require("../todo");

const {all, markAsComplete,add} = todoList();

describe("TodolList Test Suite",()=>{
    test("Should add new todo",()=>{
        expect(all.length).toBe(0);
        add({
            title: "Test Todo",
            dueDate: new Date().toISOString().split("T")[0],
            completed: false
        })
    expect(all.length).toBe(1);
    });
    test("Should mark todo as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });
});