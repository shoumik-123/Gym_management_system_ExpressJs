const express = require('express');
const {
  register,
  login,
} = require('../controllers/authController');
const {
  createSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedule,
  getSchedulesByTrainer,
  getSchedulesByTrainee
} = require('../controllers/scheduleController');
const {
  createOrUpdateProfile,
  getProfile,
  deleteProfile,
  bookClassSchedule
} = require('../controllers/traineeProfileController');
const { protect, checkRole } = require('../middlewares/authMiddleware');
const router = express.Router();




router.post('/register', register);
router.post('/login', login);

router.use(protect);

router.post('/schedule', checkRole(['admin']), createSchedule);
router.put('/schedule/:id', checkRole(['admin']), updateSchedule);
router.delete('/schedule/:id', checkRole(['admin']), deleteSchedule);
router.get('/schedule/:id', getSchedule);
router.get('/schedule/trainer/:trainerId', getSchedulesByTrainer);
router.get('/schedule/trainee/:traineeId', getSchedulesByTrainee);

router.use('/trainee-profile', checkRole(['trainee']));
router.post('/trainee-profile', createOrUpdateProfile);
router.get('/trainee-profile', getProfile);
router.delete('/trainee-profile', deleteProfile);

router.post('/trainee/book-schedule', bookClassSchedule);

module.exports = router;
