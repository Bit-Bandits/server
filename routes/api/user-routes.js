const router = require('express').Router();
const { 
    getSingleUser,
    createUser,
    login,
    saveFood,
    deleteFood,
    login,



    
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware,saveFood);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:userId/foods/:foodId').post(authMiddleware, addFood).delete(authMiddleware, deleteFood);





module.exports = router;
