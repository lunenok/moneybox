import { makeAutoObservable } from "mobx";
import { writePayments } from "../api";
import { MonthFlow, PaymentType, OutcomesKinds, Outcome } from "../types/types";

export const OutcomesTypes = {
    Payments: 0,
    Car: 1,
    Holidays: 2
};

const initialValues = [{title: 'Payments', payments: []}, {title: 'Car', payments: []}, {title: 'Holidays', payments: []}];

export const outcomesStore = makeAutoObservable({
    outcomes: initialValues as Array<Outcome>,
    isLoading: true,

    save: (data: Array<PaymentType>, title: OutcomesKinds) => {
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
                sum +=element.amount;
            })
        })
        return sum;
    },

    // Нагуглил as {[index: string]: number}, надо разобраться
    getByMonth: (index = 0) => {
        const incomesByMonts = outcomesStore.outcomes[index].payments.reduce(
            (acc, cur) => (((acc[cur.month] = (acc[cur.month] || 0) + cur.amount), acc)),
            {} as {[index: string]: number}
        );
        return incomesByMonts
    },

    _createEmptyPaymentsObj: () => {
        const obj = {} as MonthFlow;
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

