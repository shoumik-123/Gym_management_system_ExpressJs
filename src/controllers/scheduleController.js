const Schedule = require('../models/ScheduleModel');
const User = require('../models/UserModel');

exports.createSchedule = async (req, res) => {
  try {
    const { name, trainer, date, time, slots } = req.body;
    console.log(req.body);
    
    const schedule = await Schedule.create({
      name,
      trainer,
      date,
      time,
      slots,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, message: "Schedule created successfully", data: schedule });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error creating schedule", error: err.message });
  }
};

exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.user.id },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: "Schedule updated successfully", data: updatedSchedule });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error updating schedule", error: err.message });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    res.status(200).json({ success: true, message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error deleting schedule", error: err.message });
  }
};


exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    res.status(200).json({ success: true, data: schedule });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error retrieving schedule", error: err.message });
  }
};

exports.getSchedulesByTrainer = async (req, res) => {
  try {
    const schedules = await Schedule.find({ trainer: req.params.trainerId });
    if (!schedules.length) {
      return res.status(404).json({ success: false, message: "No schedules found for this trainer" });
    }

    res.status(200).json({ success: true, data: schedules });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error retrieving schedules by trainer", error: err.message });
  }
};

exports.getSchedulesByTrainee = async (req, res) => {
  try {
    const schedules = await Schedule.find({ trainees: req.params.traineeId });
    if (!schedules.length) {
      return res.status(404).json({ success: false, message: "No schedules found for this trainee" });
    }

    res.status(200).json({ success: true, data: schedules });
  } catch (err) {
    res.status(400).json({ success: false, message: "Error retrieving schedules by trainee", error: err.message });
  }
};
