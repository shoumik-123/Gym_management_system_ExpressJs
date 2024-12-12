const TraineeProfile = require('../models/TraineeProfileModel');
const Schedule = require('../models/ScheduleModel');



exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, skills, availability } = req.body;

    let profile = await TraineeProfile.findOne({ user: req.user.id });

    if (profile) {
      profile.bio = bio;
      profile.skills = skills;
      profile.availability = availability;
      profile.updatedAt = Date.now();
      await profile.save();

      return res.status(200).json({ success: true, message: 'Profile updated successfully', data: profile });
    }

    profile = await TraineeProfile.create({
      user: req.user.id,
      bio,
      skills,
      availability,
    });

    res.status(201).json({ success: true, message: 'Profile created successfully', data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating or updating profile', error: err.message });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const profile = await TraineeProfile.findOne({ user: req.user.id }).populate('user', 'name email role');
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error retrieving profile', error: err.message });
  }
};


exports.deleteProfile = async (req, res) => {
  try {
    const profile = await TraineeProfile.findOneAndDelete({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.status(200).json({ success: true, message: 'Profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting profile', error: err.message });
  }
};




exports.bookClassSchedule = async (req, res) => {
    try {
      const { scheduleId } = req.body;
      const traineeId = req.user.id;
  
      // Find the schedule by ID
      const schedule = await Schedule.findById(scheduleId);
      if (!schedule) {
        return res.status(404).json({ success: false, message: "Schedule not found" });
      }
  
      // Check if the trainee is already enrolled in the schedule
      if (schedule.trainees.includes(traineeId)) {
        return res.status(400).json({ success: false, message: "You are already enrolled in this schedule" });
      }
  
      // Add the trainee to the schedule
      schedule.trainees.push(traineeId);
      await schedule.save();
  
      res.status(200).json({ success: true, message: "Class schedule booked successfully", data: schedule });
    } catch (err) {
      res.status(400).json({ success: false, message: "Error booking class schedule", error: err.message });
    }
  };
  
  