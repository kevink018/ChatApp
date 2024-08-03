import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    // console.log("message sent", req.params.id);
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },

        })

        // find conversation between users or sending message for first time, it would be null
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
                // in the message model, it auto assign to empty array when first started so no need to put it here
            })
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // need to save in order for database to show up,
        //it is pushed to newMessage but never save without 2 lines below
        // await conversation.save();
        // await newMessage.save();

        //do this instead of 2 lines above, this will run in parallel
        // they both run at the exact same time

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"});

    }
}

export const getMessages = async (req, res) => {
    try {

        const { id:userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); //not references but actual messages

        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;

        res.status(200).json(messages);
    }

    catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error: "Internal Server Error"});

    }
}