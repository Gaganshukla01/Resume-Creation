const express = require('express');
const router = express.Router();
const AdminController  = require('../controllers/adminController');
const { validateCreateAdmin } = require('../validations/adminValidation');
const Cloudinary=require("../controllers/CloudniaryController")
router.post('/create', validateCreateAdmin, AdminController.createAdmin);
router.post('/login', AdminController.loginAdmin);
router.post('/blog', AdminController.createBlog);
router.get('/blog', AdminController.getBlog);
router.delete('/blog/:id', AdminController.deleteBlog);
router.put('/blog/:id', AdminController.updateBlog);
router.post('/upload',Cloudinary.upload.array('photo', 12),Cloudinary.uploadImageCloud)

module.exports = router;
