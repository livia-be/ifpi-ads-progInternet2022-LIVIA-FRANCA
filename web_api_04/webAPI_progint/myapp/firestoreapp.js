var admin = require("./node_modules/firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore()



db.collection("posts")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((post) => {
            // doc.data() is never undefined for query doc snapshots
            console.log({ id: post.id,...post.data()});
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
   
   

console.log('conectou...')