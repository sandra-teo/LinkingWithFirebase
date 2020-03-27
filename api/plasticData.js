// functions used to call firebase

import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgEAN4lNtqkYzhilZYr6h0nz5gYXscSCs",
    authDomain: "fyp-goearth.firebaseapp.com",
    databaseURL: "https://fyp-goearth.firebaseio.com",
    projectId: "fyp-goearth",
    storageBucket: "fyp-goearth.appspot.com",
    messagingSenderId: "47240667694",
    appId: "1:47240667694:web:207faf3de900bff152b5bf"
};

class plasticData {
    constructor(callback) {
        this.init(callback);
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("Plastic")
            .doc(this.userId)
            .collection("lists");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe();
    }
}

export default plasticData;


// export default plasticData = [
//     {
//         image: 'Plastic',
//         description: 'Bottles, Containers, Packaging',
//         ways: 'Empty and rinse before throwing into the red bin.',
//     },
//     {
//         name: 'Plastic',
//         description: 'CD Casing, Plastic Bags, Cling Wrap, Hanger',
//         ways: 'Just place it into the red bin',
//     },
// ];