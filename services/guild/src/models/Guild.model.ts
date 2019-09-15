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
  region: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    default: ["Guild Master"]
  },
  members: [
    {
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
    }
  ]
});

export default model("guild", guildSchema);
