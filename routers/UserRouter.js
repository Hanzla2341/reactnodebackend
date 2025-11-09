const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const emailutils=require('../utils/emailverification')

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.post('/send-code',emailutils.sendCode);
router.post('/update-password',userController.updatePassword);
router.post('/orders',userController.orders);



module.exports = router;
