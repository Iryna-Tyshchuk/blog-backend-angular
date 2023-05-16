const express = require("express");

const ctrl = require("../../controllers/posts");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/post");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:postId", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put(
  "/:postId",

  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

// router.patch(
//   "/:postId/favorite",

//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   ctrl.updateFavorite
// );

router.delete("/:postId", isValidId, ctrl.deleteById);

module.exports = router;
