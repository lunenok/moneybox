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
    }
});

window.outcomesStore = outcomesStore;