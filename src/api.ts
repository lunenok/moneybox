import { database, app, } from './firebase';
import { ref, set, get, child } from "firebase/database";
import { getAuth } from 'firebase/auth';
import { initialValue as incomesInitialValue }  from './store/income';
import { whishlistInitialValues } from './store/whislist';
import { PaymentType, Incomes, Whishlist, OutcomesKinds } from './types/types';

const auth = getAuth(app);
const db = database;

export const writeRegular = (data: Array<PaymentType>) => {
    const userUid = auth.currentUser?.uid;
    set(ref(db, 'regulars/' + userUid), {
        regulars: data,
    });
};

export const getRegular = async (action: (snapshot: Array<PaymentType>) => void) => {
    const userUid = auth.currentUser?.uid;
    const dbRef = ref(database);

    get(child(dbRef, 'regulars/' + userUid)).then((snapshot) => {
        if (snapshot.exists()) {
            action(snapshot.val().regulars);
        } else {
            console.log('no regulars on server')
        }
    })
};

export const writePayments = (data: Array<PaymentType>, title: string) => {
    const userUid = auth.currentUser?.uid;
    set(ref(db, 'payments/' + userUid + '/' + title), {
        payments: data,
    })
};

export const getPayments = async (action: (snapshot: Array<PaymentType>, title: OutcomesKinds) => void, title: OutcomesKinds) => {
    const userUid = auth.currentUser?.uid;
    const dbRef = ref(database);

    get(child(dbRef, 'payments/' + userUid + '/' + title)).then((snapshot) => {
        if (snapshot.exists()) {
            action(snapshot.val().payments, title);
        } else {
            action([], title);
        }
    })
};

export const writeIncomes = (data: Incomes) => {
    const userUid = auth.currentUser?.uid;
    set(ref(db, 'incomes/' + userUid), {
        incomes: data
    });
};

export const getIncomes = async (action: (snapshot: Incomes) => void) => {
    const userUid = auth.currentUser?.uid;
    const dbRef = ref(database);
    
    get(child(dbRef, 'incomes/' + userUid)).then((snapshot) => {
        if (snapshot.exists()) {
            const data =snapshot.val().incomes;
            if (!data.anotherIncomes) data.anotherIncomes = [];
            action(data);
        } else {
            action(incomesInitialValue);
        }
    });
};

export const writeWhishes = (data: Whishlist) => {
    const userUid = auth.currentUser?.uid;
    set(ref(db, 'whishes/' + userUid), {
        whishes: data
    });
};

export const getWhishes = async (action: (snapshot: Whishlist) => void) => {
    const userUid = auth.currentUser?.uid;
    const dbRef = ref(database);
    
    get(child(dbRef, 'whishes/' + userUid)).then((snapshot) => {
        if (snapshot.exists()) {
            const data =snapshot.val().whishes;
            if (!data.stuff) data.stuff = [];
            action(data);
        } else {
            action(whishlistInitialValues);
        }
    });
}