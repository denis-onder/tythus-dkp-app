import { Schema, model } from "mongoose";

const memberSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  DKP: {
    type: Number,
    default: 0
  },
  class: {
    type: String,
    required: true
  }
});

const guildSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  realm: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  faction: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    default: ["Guild Master", "Officer", "Member", "Recruit"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  members: [memberSchema]
});

export default model("guild", guildSchema);
