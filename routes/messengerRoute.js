const router = require('express').Router();

const {getFriends,sendMessage,getMessage,sendImageMessage,messageSeen,delivaredMessage} = require('../controller/messengerController');
const {authMiddleware} = require('../middleware/authMiddleware');

router.get('/get-friends/:myId',authMiddleware,getFriends);
router.get('/get-message/:myId/:fdId',authMiddleware,getMessage);
router.post('/send-message',authMiddleware,sendMessage);
router.post('/image-message-send',authMiddleware,sendImageMessage);
router.put('/seen-message',authMiddleware,messageSeen);
router.put('/delivared-message',authMiddleware,delivaredMessage);

module.exports = router;
 