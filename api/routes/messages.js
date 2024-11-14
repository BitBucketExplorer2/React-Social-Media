const router = require('express').Router()
const Message = require('../models/Message')

/**
 * Add New Message
 */
router.post('/', async (req, res) => {
    try {

        const NewMessage = new Message(req.body);
        const savedMessage = await NewMessage.save();
        res.status(200).json(savedMessage);

    } catch (err) {
        res.status(500).json(err);
    }
})



/**
 * Get Message By Conversation Id
 */

router.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err)
    }
})








module.exports = router
