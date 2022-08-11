import { makeAutoObservable } from "mobx";
import { writeWhishes } from '../api';
import { WhishlistType } from "../types/types";

export let whishlistInitialValues = {save: 0, percent: 'yes' as 'yes' | 'no', stuff: []}

export const whishlistStore = makeAutoObservable({
    whishlist: whishlistInitialValues as WhishlistType,
    isLoading: true,

    save: (whishlist: WhishlistType) => {
        whishlistStore.whishlist = whishlist;
        whishlistStore.isLoading = false;
        writeWhishes(whishlist);
    },

    getByMonth: () => {
        return whishlistStore.whishlist.stuff.reduce(
            (acc, cur) => (((acc[cur.month] = (acc[cur.month] || 0) + cur.amount), acc)), 
            {} as {[index: string] : number} 
          );
    },

    clean: () => {
        whishlistStore.whishlist = whishlistInitialValues;
        whishlistStore.isLoading = true;
    }
});
