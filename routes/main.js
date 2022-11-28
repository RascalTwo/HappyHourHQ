const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const postsController = require("../controllers/posts");


router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup)
router.post("/createHH", postsController.createHH)
router.post("/getFavoritePosts", postsController.getFavoritePosts)


router.get('/logout', authController.logout);
router.get('/authenticated', authController.getAuthenticated);
router.get('/getHHPost/:id', postsController.getHHPost)
router.get("/getHHData", postsController.getHHData)
router.get("/getUserData", postsController.getUserData)

router.put("/addFavorite/:id", postsController.addFavorite)
router.put("/updateRating/:id", postsController.updateRating)
router.put("/addImage/:id", postsController.addImage)

router.delete("/rmFavorite/:id", postsController.rmFavorite)

module.exports = router;
