"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
    static getTodos(){
      return this.findAll();
    }
    static async getOverdue(){
      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]:new Date(),
          },
          completed: false,
        }
      })
    }
    static async getDueToday(){
      
      return this.findAll({
        where: {
          dueDate:{
          [Op.eq]: new Date().toISOString().split("T")[0]},
          completed: false,
        }
      });
    }
    static async getDueLater(){
        return this.findAll({
                where: {
                  dueDate: {
                    [Op.gt]:new Date(),
                  },
                  completed: false,
                }
              })
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
    }
  );
  return Todo;
};
