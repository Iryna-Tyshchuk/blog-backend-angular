const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const commentSchema = new Schema(
  {
    author: { type: String },
    comment: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "post",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

commentSchema.post("save", handleMongooseError);

const Comment = model("comment", commentSchema);

module.exports = {
  Comment,
};
