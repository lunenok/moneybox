import { makeAutoObservable } from "mobx";

const outcomesMock = [
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
        month: 4
    }
];

export const outcomesStore = makeAutoObservable({
    outcomes: outcomesMock,

    save: (outcomes) => {
        outcomesStore.outcomes = outcomes
    },

    getByMonth: () => {
        const incomesByMonts = outcomesStore.outcomes.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev),
            {}
        );
        return incomesByMonts
    }

});

window.outcomesStore = outcomesStore;