import { Schema, model } from "mongoose";

const guildSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  realm: {
    type: String,
    required: true
  },
  members: {
    type: Array,
    default: []
  }
});

export default model("guild", guildSchema);
