import { makeAutoObservable } from "mobx";

const whislistMock = {
    save: 10,
    percent: 'no',
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

export const whishlistStore = makeAutoObservable({
    whishlist: whislistMock,

    save: (whishlist) => {
        whishlistStore.whishlist = whishlist;
    },

    getByMonth: () => {
        return whishlistStore.whishlist.stuff.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev), {}
          );
    }
});

window.whislistMock = whislistMock;