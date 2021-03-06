import { makeAutoObservable } from "mobx";
import { writePayments } from "../api";

// const outcomesMock = [
//     {
//         title: 'Payments',
//         payments: [
//             {   
//                 id: 1,
//                 description: 'adidas nmd_r1',
//                 amount: 12,
//                 currency: 'rub',
//                 month: 4
//             },
//         ]
//     },
//     {
//         title: 'Car',
//         payments: [
//             {
//                 id: 1,
//                 description: 'new tyres',
//                 amount: 45000,
//                 currency: 'rub',
//                 month: 8
//             },
//             { 
//                 id: 2,
//                 description: 'maintence',
//                 amount: 15000,
//                 currency: 'rub',
//                 month: 9,
//             },
//             {
//                 id: 3,
//                 description: 'insurance',
//                 amount: 11000,
//                 currency: 'rub',
//                 month: 10,
//             }
//         ]
//     },
//     {
//         title: 'Holidays',
//         payments: [
//             {
//                 id: 1,
//                 description: 'My birthday',
//                 amount: 25000,
//                 currency: 'rub',
//                 month: 1
//             },
//             {
//                 id: 2,
//                 description: 'Tomilina',
//                 amount: 1000,
//                 currency: 'rub',
//                 month: 2
//             },
//             {
//                 id: 3,
//                 description: 'Samatov',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 3
//             },
//             {
//                 id: 4,
//                 description: '8 march',
//                 amount: 10000,
//                 currency: 'rub',
//                 month: 3
//             },
//             {
//                 id: 5,
//                 description: 'Kudin',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 5
//             },
//             {
//                 id: 6,
//                 description: 'Alena',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 5
//             },
//             {
//                 id: 7,
//                 description: 'Smirnov',
//                 amount: 1000,
//                 currency: 'rub',
//                 month: 5
//             },
//             {
//                 id: 8,
//                 description: 'Bokov',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 7
//             },
//             {
//                 id: 9,
//                 description: 'Grandda',
//                 amount: 10000,
//                 currency: 'rub',
//                 month: 7
//             },
//             {
//                 id: 10,
//                 description: 'Tatarinova',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 7
//             },
//             {
//                 id: 11,
//                 description: 'Vinnik',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 8
//             },
//             {
//                 id: 12,
//                 description: 'Kornev',
//                 amount: 1000,
//                 currency: 'rub',
//                 month: 8
//             },
//             {
//                 id: 13,
//                 description: 'Terehova',
//                 amount: 1000,
//                 currency: 'rub',
//                 month: 8
//             },
//             {
//                 id: 14,
//                 description: 'Lobov',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 9
//             },
//             {
//                 id: 15,
//                 description: 'Spas',
//                 amount: 3000,
//                 currency: 'rub',
//                 month: 9
//             },
//             {
//                 id: 16,
//                 description: 'Venya',
//                 amount: 5000,
//                 currency: 'rub',
//                 month: 10
//             },
//             {
//                 id: 17,
//                 description: 'Martinyuk',
//                 amount: 5000,
//                 currency: 'rub',
//                 month: 11
//             },
//             {
//                 id: 18,
//                 description: 'Grandma',
//                 amount: 5000,
//                 currency: 'rub',
//                 month: 12
//             },

//         ]
//     }
// ];

export const OutcomesTypes = {
    Payments: 0,
    Car: 1,
    Holidays: 2
};

const initialValues = [{title: 'Payments', payments: []}, {title: 'Car', payments: []}, {title: 'Holidays', payments: []}];

export const outcomesStore = makeAutoObservable({
    outcomes: initialValues,
    isLoading: true,

    save: (data, title) => {
        const index = OutcomesTypes[title];
        outcomesStore.outcomes[index].payments = data;
        outcomesStore.outcomes[index].title = title;
        writePayments(data, title); 
        outcomesStore.isLoading = false;
    },

    getTotal: () => {
        let sum = 0;
        outcomesStore.outcomes.forEach((outcomes) => {
            outcomes.payments.forEach((element) => {
                sum +=parseInt(element.amount);
            })
        })
        return sum;
    },

    getByMonth: (index = 0) => {
        const incomesByMonts = outcomesStore.outcomes[index].payments.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev),
            {}
        );
        return incomesByMonts
    },

    _createEmptyPaymentsObj: () => {
        const obj = {};
        for (let i = 1; i <= 12; i++) {
          obj[i] = 0;
        }
        return obj;
    },

    getAllOutcomes: () => {
        const differnetPayment = outcomesStore.getByMonth(0);
        const carPayments = outcomesStore.getByMonth(1);
        const holidayPayment = outcomesStore.getByMonth(2);
        const newObj = outcomesStore._createEmptyPaymentsObj();
        Object.keys(newObj).forEach((month) => {
            newObj[month] =
              (differnetPayment[month] || 0) +
              (carPayments[month] || 0) +
              (holidayPayment[month] || 0);
          });
        return newObj;
    },

    clean: () => {
        outcomesStore.outcomes = initialValues;
        outcomesStore.isLoading = true;
    },
});

window.outcomesStore = outcomesStore;