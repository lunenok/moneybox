import { makeAutoObservable } from "mobx";

const whislistMock = [
    {   
        id: 1,
        description: 'iphone 13',
        amount: 80000,
        currency: 'rub',
        month: 8
    },
    {   
        id: 2,
        description: 'adidas nmd_r1',
        amount: 12000,
        currency: 'rub',
        month: 8
    }
];

export const whishlistStore = makeAutoObservable({
    whishlist: whislistMock,

    save: (whishlist) => {
        whishlistStore.whishlist = whishlist
    },

    getByMonth: () => {
        return whishlistStore.whishlist.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev), {}
          );
    }
});

window.whislistMock = whislistMock;