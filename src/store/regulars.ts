import { makeAutoObservable } from 'mobx';
import { writeRegular } from '../api';
import { PaymentType } from '../types/types';

export const subsStore = makeAutoObservable({
    subs: [] as Array<PaymentType>,
    isLoading: true,

    save: (subs: Array<PaymentType>) => {
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
        subsStore.subs.forEach((element) => total += element.amount)
        return total * 12;
    },

    getByMonth: () => {
        let monthPayments = 0;
        subsStore.subs.forEach((sub) => {
            monthPayments = monthPayments + sub.amount;
        });
        return monthPayments;
    }
  
});
