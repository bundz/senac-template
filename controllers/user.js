const Joi = require('joi');
const User = require('../models/user');

class UserController {
  async list(req, res) {
    const { limit, skip, orderBy, order } = req.query;
    const sort = {};
    sort[orderBy] = order;
    const users = await User.find(limit, skip, sort);
    res.send(users);
  }

  async find(req, res) {
    const { id } = req.params;
    const user = await User.findOne(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  }

  get createSchema() {
    return Joi.object({
      body: Joi.object( {
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        avatar: Joi.string().min(4).max(299).default('default.jpg'),
        roles: Joi.array().items(Joi.string().allow('admin', 'default')).required()
      })
    });
  }

  async create(req, res) {
    const { insertedId } = await User.insertOne(req.body);
    res.send({ insertedId });
  }

  async update(req, res) {
    const { id } = req.params;
    await User.updateOne(id, req.body);
    const user = await User.findOne(id);

    if (!user) {
      res.status(404).send();
    }

    res.send(user);
  }

  async delete(req, res) {
    const { id } = req.params;
    await User.deleteOne(id);
    res.send({});
  }

  validateListUserMiddleware(req, res, next) {
    const { limit = 10, skip = 0, orderBy = "name", order = 1 } = req.query;

    if (Number.isNaN(limit) || Number.isNaN(skip)) {
      res.status(400);
      throw Error("Limit and Skip should be a number");
    }

    if (limit < 1 || skip < 0) {
      res.status(400);
      throw new Error(
        "Limit should be greater than 0 and Skip should be at least 0"
      );
    }

    req.query.limit = Number(limit);
    req.query.skip = Number(skip);
    req.query.order = Number(order);
    req.query.orderBy = orderBy;

    return next();
  }

  validateUserMiddleware(req, res, next) {
    const { name, email, password, avatar, roles } = req.body;

    if (name.length < 5) {
      return res
        .status(400)
        .send({ message: "Name should length greater than 5" });
    }

    if (!Array.isArray(roles)) {
      return res.status(400).send({ message: "Roles should be an array" });
    }

    req.body = { name, email, password, avatar, roles };

    return next();
  }
}

module.exports = new UserController();
