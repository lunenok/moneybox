import { database, app, } from './firebase';
import { ref, set, get, child } from "firebase/database";
import { getAuth } from 'firebase/auth';

const auth = getAuth(app);
const db = database;

export const writeRegular = (data) => {
    const userUid = auth.currentUser.uid;
    set(ref(db, 'regulars/' + userUid), {
        regulars: data,
    });
};

export const getRegular = async (action) => {
    const dbRef = ref(database);
    const userUid = auth.currentUser.uid;

    get(child(dbRef, 'regulars/' + userUid)).then((snapshot) => {
        if (snapshot.exists()) {
            action(snapshot.val().regulars);
        } else {
            console.log('no regulars on server')
        }

    })
};