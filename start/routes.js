"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Database = use("Database");

Route.group(() => {
  Route.post("/register", "AuthController.register");
  Route.post("/login", "AuthController.authenticate");
  Route.get("/user", "AuthController.user").middleware("auth");

  Route.get("todo", "TodoListController.index").middleware("auth");
  Route.post("todo", "TodoListController.store").middleware("auth");
  Route.get("todo/:id", "TodoListController.show").middleware("auth");
  Route.delete("todo/:id", "TodoListController.destroy").middleware("auth");
  Route.put("todo/:id", "TodoListController.update").middleware("auth");

}).prefix("api");
