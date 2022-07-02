import { makeAutoObservable } from 'mobx';
import { writeRegular } from './../api';

// const regularMock = [
//     {
//         id: 1,
//         description: 'internet',
//         amount: 720,
//         currency: 'rub'
//     },
//     {
//         id: 2,
//         description: 'mobile phone',
//         amount: 635,
//         currency: 'rub'
//     },
//     {
//         id: 3,
//         description: 'vpn',
//         amount: 500,
//         currency: 'rub'
//     },
//     {
//         id: 4,
//         description: 'car washing',
//         amount: 1800,
//         currency: 'rub'
//     },
//     {
//         id: 5,
//         description: 'pocket',
//         amount: 25000,
//         currency: 'rub'
//     },
//     {
//         id: 6,
//         description: 'lunches',
//         amount: 8400,
//         currency: 'rub'
//     },
//     {
//         id: 7,
//         description: 'petrol',
//         amount: 4000,
//         currency: 'rub'
//     },
//     {
//         id: 8,
//         description: 'GYM',
//         amount: 6000,
//         currency: 'rub'
//     },
//     {
//         id: 9,
//         description: 'sports nutrition',
//         amount: '8000',
//         currency: 'rub'
//     },
//     {
//         id: 10,
//         description: 'coach',
//         amount: 12000,
//         currency: 'rub'
//     }
// ];

export const subsStore = makeAutoObservable({
    subs: [],
    isLoading: true,

    save: (subs) => {
        subsStore.subs = subs;
        writeRegular(subs);
        subsStore.isLoading = false;
    },

    clean: () => {
        subsStore.subs = [];
        subsStore.isLoading = true;
    },

    getTotal: () => {
        let total = 0;
        subsStore.subs.forEach((element) => total += parseInt(element.amount))
        return total * 12;
    },

    getByMonth: () => {
        let monthPayments = 0;
        subsStore.subs.forEach((sub) => {
            monthPayments = parseInt(monthPayments) + parseInt(sub.amount);
        });
        return monthPayments;
    }
  
});

window.subsStore = subsStore;