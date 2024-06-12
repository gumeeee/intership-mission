const express = require("express");

const app = express();

const UsersConstroller = require("./controllers/UsersController");
const handlerErrors = require("./errors/handlerErrors");

const routes = express.Router();

routes.get("/users", UsersConstroller.index);

routes.post("/users/login", UsersConstroller.login);

routes.post("/users", UsersConstroller.register);

routes.post('/invite-user', UsersConstroller.inviteMember)

routes.use(handlerErrors);

module.exports = routes;
