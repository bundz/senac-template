const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user");
const ValidationMiddleware = require("../../middlewares/validation");

router.get(
  "/:id",
  UserController.validateListUserMiddleware,
  UserController.find
);
router.get("/", UserController.validateListUserMiddleware, UserController.list);
router.post("/", ValidationMiddleware(UserController.createSchema), UserController.create);
router.put(
  "/:id",
  UserController.validateUserMiddleware,
  UserController.update
);
router.delete("/:id", UserController.delete);

module.exports = router;
