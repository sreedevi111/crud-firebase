const functions = require("firebase-functions");


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");

// TODO:: add this function
exports.sendPushToTopic = functions.https.onRequest((request, response) => {
  var topic = request.body.topic // I received topic name here
    var title = request.body.title
    var description = request.body.description
    if(typeof topic !== 'undefined'){

    const message = {
      notification: {
        title: title,
        body: description
      },
      topic: topic
    };

   
    return admin.messaging().send(message)
    .then((response2) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response2);
      return response.send({ status: true })
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      return response.send({ status: false })
    });


    }
})


exports.getData = functions.https.onRequest((request, response) => {
 console.log("Request in getData api::", request)
const dataArray = [];
admin.firestore()
  .collection('Contacts')
  .get()
  .then(snapShot => {
    snapShot.docs.map(each => {
      dataArray.push({...each.data(), id: each.id});
    });
    response.send({status:true, data: dataArray});
  })
  .catch(error => {
    response.send({status:false, data: null});
})
});


// exports.addData =  functions.https.onRequest((request, response) => {
//     const dataArray = [];
//     admin.firestore()
//       .collection('Contacts')
//       .get()
//       .then(snapShot => {
//         snapShot.docs.map(each => {
//           dataArray.push({...each.data(), id: each.id});
//         });
//         response.send({status:true, data: dataArray});
//       })
//       .catch(error => {
//         response.send({status:false, data: null});
//     })
//     });
