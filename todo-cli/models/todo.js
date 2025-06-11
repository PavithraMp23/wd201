// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const tasksOverdue = await Todo.overdue();
      console.log(
        tasksOverdue.map((task) => task.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Today");
      const tasksToday = await Todo.dueToday();
      console.log(
        tasksToday.map((task) => task.displayableString()).join("\n"),
      );
      console.log("\n");

      console.log("Due Later");
      const tasksLater = await Todo.dueLater();
      console.log(
        tasksLater.map((task) => task.displayableString()).join("\n"),
      );
      console.log("\n");
    }

    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date().toISOString().split("T")[0],
          },
        },
        order: [
          ["dueDate", "DESC"],
          ["id", "ASC"],
        ],
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE TODAY
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date().toISOString().split("T")[0],
          },
        },
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date().toISOString().split("T")[0],
          },
        },
        order: [
          ["dueDate", "ASC"],
          ["id", "ASC"],
        ],
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const todo = await Todo.findByPk(id);
      if (todo) {
        todo.completed = true;
        await todo.save();
        return todo;
      }
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const date = new Date().toISOString().split("T")[0];
      if (this.dueDate === date) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );
  return Todo;
};
