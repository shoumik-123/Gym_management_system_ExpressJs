const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name for the schedule"],
      trim: true,
    },
    trainer: {
      type: mongoose.Schema.ObjectId,
      ref: "trainer",
      required: [true, "Please add a trainer"],
    },
    trainees: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "trainee",
      },
    ],
    date: {
      type: Date,
      required: [true, "Please add a date"],
    },
    time: {
      type: String,
      required: [true, "Please add a time"],
    },
    slots: {
      type: Number,
      default: 10,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "admin",
      required: [true, "Please add an admin"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
