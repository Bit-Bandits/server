const router = require('express').Router();
const { 
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFood,
    removeFood
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, updateUser);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:userId/foods/:foodId').post(authMiddleware, addFood).delete(authMiddleware, removeFood);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/').get(getAllUsers);


module.exports = router;
