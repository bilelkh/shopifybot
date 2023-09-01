
const MessageModel = require('../models/message.model');
const callChatGPT = require('../utils/gpt');
const { INITALIZE_CHAT } = require('../utils/constants');

//Simple version, without validation or sanitation
exports.getAllMessages = function (req, res) {
    MessageModel.find(function (err, messages) {
        if (err) return next(err);
        res.send(messages);
    })
}

exports.createMessage = async (req, res) => {

    const oldMessages = await MessageModel.find({})

    const result = await callChatGPT(req.body.message, oldMessages)


    return res.send(result)



    // let message = new MessageModel(
    //     {
    //         message: req.body.message,
    //         user: req.body.user
    //     }
    // );

    // message.save(function (err) {
    //     if (err) {
    //         return next(err);
    //     }
    //     res.send('Message Created successfully')
    // })
}


exports.intializeChat = async (req, res) => {
    console.log("req.body", req.body)
    await callChatGPT(INITALIZE_CHAT, []).then(async (r) => {

        let message = new MessageModel(
            {
                message: r.choices[0].message.content,
                user: r.choices[0].message.role
            }
        );
        const msg = await message.save()
        return res.send(msg)
    }).catch((e) => {
        return res.status(500).send(e)
        console.log("e", e)
    })


    // return res.send(result)
}
