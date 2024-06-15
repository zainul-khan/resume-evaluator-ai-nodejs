const router = require('express').Router();
const {userAuth, userHandler} = require('../controllers');

//auth
router.post('/login', userAuth.login);
router.post('/signup', userAuth.signUp);
router.put('/logout', userAuth.logOut);

//user

router.post('/resume-analytics-zainul', userHandler.createResumeAnalyticsZainul);
router.get('/resume-analytics-yash', userHandler.createResumeAnalyticsYash);
router.get('/resume-analytics-saddam', userHandler.createResumeAnalyticsSaddam);
router.get('/resume-analytics-ankiy', userHandler.createResumeAnalyticsAnkit);

module.exports = {router}