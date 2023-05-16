const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const topicList = ["Hobby", "Travel", "Home", "Lifestyle"];
const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;
const imageSchema = new Schema({
  title: { type: String, default: "Picture" },
  url: { type: String, required: true }
});
const commentsSchema = new Schema({
  author: { type: String },
  comment: { type: String }
});

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for post "],
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      enum: topicList,
      // default: "Lifestyle",
      required: true,
    },
    images: [imageSchema],
    comments: [commentsSchema],
    date: {
      type: String,
      match: dateRegexp,
      default: "17-05-2023",
    },
  },
  { versionKey: false, timestamps: true }
);

// handleMongooseError - відловлює помилки що кидає монгус
postSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string(),
  subtitle: Joi.string(),
  description: Joi.string(),
  topic: Joi.string().valid(...topicList),
  date: Joi.string().pattern(dateRegexp),
  images: Joi.array().items(
    Joi.object({ title: Joi.string(), url: Joi.string() })
  ),
  comments: Joi.array().items(
    Joi.object({ author: Joi.string(), comment: Joi.string() })
  ),
});

const schemas = {
  addSchema,
};

const Post = model("post", postSchema);

module.exports = {
  Post,
  schemas,
};
