"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const TodoList = use("App/Models/TodoList");
const AuthorizationService = use("App/Services/AuthorizationService");

/**
 * Resourceful controller for interacting with todolists
 */
class TodoListController {
  /**
   * Show a list of all todolists.
   * GET todolists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const user = await auth.getUser();
    const todoLists = await user.todoLists().fetch();

    return todoLists;
  }

  /**
   * Create/save a new todolist.
   * POST todolists
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const user = await auth.getUser();
    const { title, description, isDone } = request.all();
    const todoList = new TodoList();
    todoList.fill({
      title,
      isDone
    });

    await user.todoLists().save(todoList);

    return todoList;
  }

  /**
   * Display a single todolist.
   * GET todolists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth }) {
    const user = await auth.getUser();
    const { id } = params;
    const todoList = await TodoList.find(id);
    AuthorizationService.verifyPermission(todoList, user);

    return todoList;
  }

  /**
   * Update todolist details.
   * PUT or PATCH todolists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth }) {
    const user = await auth.getUser();
    const { id } = params;
    const data = request.only(["title", "isDone"]);
    const todoList = await TodoList.find(id);
    AuthorizationService.verifyPermission(todoList, user);

    todoList.merge(data);
    await todoList.save();

    return todoList;
  }

  /**
   * Delete a todolist with id.
   * DELETE todolists/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth }) {
    const user = await auth.getUser();
    const todoList = await TodoList.find(params.id);
    AuthorizationService.verifyPermission(todoList, user);

    await todoList.delete();
    return todoList;
  }
}

module.exports = TodoListController;
