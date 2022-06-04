import { makeAutoObservable } from "mobx";
import { getAuth } from 'firebase/auth';
import { database, app, } from './../firebase';
import { ref, set } from "firebase/database";

const whislistMock = {
    save: 10,
    percent: 'yes',
    stuff: [
        {   
            id: 1,
            description: 'iphone 13 pro',
            amount: 90000,  
            currency: 'rub',
            month: 8
        },
        {   
            id: 2,
            description: 'iphone 14 pro',
            amount: 90000,  
            currency: 'rub',
            month: 1
        },
    ]
}

function writeWhishes(userId, data) {
    const db = database;
    set(ref(db, 'whishlist/' + userId), {
        whishlist: data,
    });
}

const auth = getAuth(app);
const user = auth.currentUser;

export const whishlistStore = makeAutoObservable({
    whishlist: whislistMock,

    save: (whishlist) => {
        whishlistStore.whishlist = whishlist;
        writeWhishes(user.uid, whishlist);
    },

    getByMonth: () => {
        return whishlistStore.whishlist.stuff.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev), {}
          );
    }
});

window.whislistMock = whislistMock;