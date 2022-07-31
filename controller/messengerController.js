const Servs = require('../servrice/serv');

const codes = {
    ok : 200 ,
    badRequest : 200 ,
}
 
//not use
const getLastMessage = async (req , res) => {
    const { myId, fdId } = req.body;
    Servs.getLastMessage(myId, fdId).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const getFriends = async (req, res) => {
    const { myId } = req.params;

    Servs.getFriends(myId).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
     }).catch(result => {
         res.status(codes.badRequest).json({err: true, msg : result})
     })


}

const sendMessage = async (req, res) => {
    const { senderName, senderId , reseverId, message } = req.body;

    Servs.sendMessage( senderName, senderId , reseverId, message ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const getMessage = async (req, res) => {

    const {myId , fdId} = req.params;

    Servs.getMessage( myId, fdId).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const sendImageMessage = (req, res) => {
    const { senderName, senderId , reseverId , image  , type} = req.body;

    Servs.sendImageMessage(senderName, senderId , reseverId , image , type ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })
 
}

const messageSeen = async (req, res) => {
    const { _id  } = req.body;

    Servs.messageSeen( _id ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}

const delivaredMessage = async (req, res) => {
    const { _id  } = req.body;

    Servs.delivaredMessage( _id ).then(result => {
        res.status(codes.ok).json({err: false, msg : result})
    }).catch(result => {
        res.status(codes.badRequest).json({err: true, msg : result})
    })

}


module.exports = {
    getFriends , getLastMessage , getMessage , sendImageMessage , messageSeen , delivaredMessage , sendMessage
}