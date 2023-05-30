const express = require("express");

const ctrl = require("../../controllers/posts");
const ctrlComments = require("../../controllers/comments");

const { validateBody, isValidId, uploadCloud } = require("../../middlewares");

const { schemas } = require("../../models/post");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/topic", ctrl.getPostsByTopic);

router.get("/:postId", isValidId, ctrl.getById);

const uploadHandler = (req, res, next) => {
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => {
      return {
        url: file.path,
        titleImg: file.originalname,
      };
    });
  }
  next();
};

router.post(
  "/",
  // validateBody(schemas.addSchema),
  uploadCloud.array("images", 10),
  uploadHandler,
  ctrl.add
);

router.put(
  "/:postId",
  uploadCloud.array("images"),
  uploadHandler,
  // isValidId,
  // validateBody(schemas.addSchema),
  ctrl.updateById
);

router.delete("/:postId", isValidId, ctrl.deleteById);

router.get("/:postId/comments", ctrlComments.getComments);

router.post("/:postId/comments", ctrlComments.createComment);

module.exports = router;
