const User = require('../models/authModel');
const messageModel = require('../models/messageModel');
const fs = require('fs');


const getLastMessage = (myId, fdId) => {

  return  new Promise((resolve, reject) => {
        messageModel.findOne({message : {$ne : "2222"}}, (errFind, Messages) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (!Messages) {
                reject("there are no Message")
                return
            }

            resolve(Messages)

    }).sort({ updatedAt: -1 })

  //  }).or([{ senderId: myId, reseverId: fdId }, { senderId: fdId, reseverId: myId }]).sort({ updatedAt: -1 })

    })

}

const getFriends = (myId) => {

 
 return   new Promise((resolve, reject) => {
     
    User.find( {_id: { $ne: myId } }, async (errFind, Friends) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Friends.length <= 0) {
                reject("there are no Friends")
                return
            }

            let fnd_msg = [] 


            for (let i = 0; i < Friends.length; i++) {

                await getLastMessage(myId, Friends[i].id)
                    .then(res => {
    
                        fnd_msg = [...fnd_msg, {
                            fndInfo: Friends[i],
                            msgInfo: res
                        }]

                        
                    }).catch(err => {
                        fnd_msg = [...fnd_msg, {
                            fndInfo: Friends[i],
                            //msgInfo: {}
                        }]

                    })

            }



          resolve(fnd_msg)

         
      })

   })
}



const getMessage = (myId, fdId) => {

    return  new Promise((resolve, reject) => {

        messageModel.find({}, (errFind, Messages) => {

            if (errFind) {
                reject(errFind)
                return
            }

            if (Messages.length <= 0) {
                reject("there are no Messages")
                return
            }

            resolve(Messages)
            
        }).or([{ senderId: myId, reseverId: fdId }, { senderId: fdId, reseverId: myId }])
    })

}


const sendMessage = (senderName, senderId , reseverId, message) => {


    return  new Promise((resolve, reject) => {

        messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
                text: message,
            }
        } , (errCreate, Message) => {
 
            if (errCreate) {
                reject(errCreate)
                return
            }
            
            resolve(Message._doc)
        })
    })

 
}



const sendImageMessage = (senderName, senderId , reseverId , image , type) => {


    return  new Promise((resolve, reject) => {

        messageModel.create({
            senderId: senderId,
            senderName: senderName,
            reseverId: reseverId,
            message: {
                text: '',
                image ,
                type 
            }
        } , (errCreate, Message) => {

            if (errCreate) {
                reject(errCreate)
                return
            }
            
            resolve(Message._doc)
        })
    })


}

const messageSeen = (messageId) => {
    console.log(messageId);


    return  new Promise((resolve, reject) => {

        messageModel.findByIdAndUpdate(messageId , {status: 'seen'} , (errUpdate, Message) => {

            if (errUpdate) {
                reject(errUpdate)
                return
            }
            
            resolve({ success: true })
           
            
        })
    })

}

const delivaredMessage = (messageId) => {


    return  new Promise((resolve, reject) => {

        messageModel.findByIdAndUpdate(messageId , {status: 'delivared'} , (errUpdate, Message) => {

            if (errUpdate) {
                reject(errUpdate)
                return
            }

        
                resolve({ success: true })
            
        })
    })

}


module.exports = {
    getFriends , getLastMessage , getMessage , sendImageMessage , messageSeen , delivaredMessage , sendMessage
}