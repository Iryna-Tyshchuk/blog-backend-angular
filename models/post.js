const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const topicList = ["Hobby", "Travel", "Home", "Lifestyle"];

const imageSchema = new Schema({
  titleImg: { type: String, default: "Picture" },
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
      required: [true, "Set subtitle for post "],
    },
    description: {
      type: String,
      required: [true, "Set description for post "],
    },
    topic: {
      type: String,
      enum: topicList,
      default: "Lifestyle",
      required: [true, "Choose one of topics: Hobby, Travel, Home, Lifestyle "],
    },
    images: [imageSchema],
    comments: [commentsSchema],
    postDate: {
      type: Date,
      default: Date.now(),
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
  date: Joi.date(),
  // images: Joi.array().items(
  //   Joi.object({ title: Joi.string(), url: Joi.string() })
  // ),
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
