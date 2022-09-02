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

exports.getData = functions.https.onRequest((request, response) => {
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
