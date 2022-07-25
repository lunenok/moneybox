import { makeAutoObservable } from "mobx";
import { writeWhishes } from '../api';
import { PaymentType } from "../types/types";

export const whishlistInitialValues = {save: 0, percent: 'yes', stuff: []}

// percent: 'yes' | 'no' - не работает
type Whishlist = {
    save: number,
    percent: string,
    stuff: Array<PaymentType>
}

export const whishlistStore = makeAutoObservable({
    whishlist: whishlistInitialValues as Whishlist,
    isLoading: true,

    save: (whishlist: Whishlist) => {
        whishlistStore.whishlist = whishlist;
        whishlistStore.isLoading = false;
        writeWhishes(whishlist);
    },

    getByMonth: () => {
        return whishlistStore.whishlist.stuff.reduce(
            (acc, cur) => ((acc[cur.month] = (acc[cur.month] || 0) + cur.amount), acc), 
            {} as {[index: string] : number} 
          );
    },

    clean: () => {
        whishlistStore.whishlist = whishlistInitialValues;
        whishlistStore.isLoading = true;
    }
});
