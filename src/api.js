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
    const userUid = auth.currentUser.uid;
    const dbRef = ref(database);

    get(child(dbRef, 'regulars/' + userUid)).then((snapshot) => {
        if (snapshot.exists()) {
            action(snapshot.val().regulars);
        } else {
            console.log('no regulars on server')
        }
    })
};

export const writePayments = (data, title) => {
    const userUid = auth.currentUser.uid;
    set(ref(db, 'payments/' + userUid + '/' + title), {
        payments: data,
    })
};

export const getPayments = async (action, title) => {
    const userUid = auth.currentUser.uid;
    const dbRef = ref(database);

    get(child(dbRef, 'payments/' + userUid + '/' + title)).then((snapshot) => {
        if (snapshot.exists()) {
            action(snapshot.val().payments, title);
            console.log(snapshot.val().payments);
        } else {
            console.log('no regulars on server');
            action([], title);
        }
    })
};

export const writeIncomes = (data) => {
    const userUid = auth.currentUser.uid;
    set(ref(db, 'incomes/' + userUid), {
        incomes: data
    });
};

export const getIncomes = async (action) => {
    const userUid = auth.currentUser.uid;
    const dbRef = ref(database);
    
    get(child(dbRef, 'incomes/' + userUid)).then((snapshot) => {
        if (snapshot.exists()) {
            action(snapshot.val().incomes);
        } else {
            console.log('no incomes on server');
        }
    });
};