'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TodoListSchema extends Schema {
  up() {
    this.create('todo_lists', (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("title").notNullable();
      table.bool("isDone");
      table.timestamps();
    })
  }

  down() {
    this.drop('todo_lists')
  }
}

module.exports = TodoListSchema
