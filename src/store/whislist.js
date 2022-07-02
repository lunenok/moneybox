import { makeAutoObservable } from "mobx";
import { writeWhishes } from './../api';

// const whislistMock = {
//     save: 10,
//     percent: 'yes',
//     stuff: [
//         {   
//             id: 1,
//             description: 'iphone 13 pro',
//             amount: 90000,  
//             currency: 'rub',
//             month: 8
//         },
//         {   
//             id: 2,
//             description: 'iphone 14 pro',
//             amount: 90000,  
//             currency: 'rub',
//             month: 1
//         },
//     ]
// }

export const whishlistInitialValues = {save: 0, percent: 'yes', stuff: []}

export const whishlistStore = makeAutoObservable({
    whishlist: whishlistInitialValues,
    isLoading: true,

    save: (whishlist) => {
        whishlistStore.whishlist = whishlist;
        whishlistStore.isLoading = false;
        writeWhishes(whishlist);
    },

    getByMonth: () => {
        return whishlistStore.whishlist.stuff.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev), {}
          );
    },

    clean: () => {
        whishlistStore.whishlist = whishlistInitialValues;
        whishlistStore.isLoading = true;
    }
});

window.whishlistStore = whishlistStore;