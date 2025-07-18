import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  salary: {
    type: Number,
    min: 0
  },
  language: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
  isManager: {
    type: Boolean,
  }
});

export const User = mongoose.model("User", userSchema, "Employees");
