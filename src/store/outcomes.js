import { makeAutoObservable } from "mobx";

const outcomesMock = {
    name: 'Payments',
    value: [
        {   
            id: 1,
            description: 'new tyres',
            amount: 45000,
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
    ]
};

export const outcomesStore = makeAutoObservable({
    outcomes: outcomesMock,

    save: (outcomes) => {
        outcomesStore.outcomes.value = outcomes
    },

    getTotal: () => {
        let sum = 0;
        outcomesStore.outcomes.value.forEach((element) => {
            sum +=parseInt(element.amount);
        });
        return sum;
    },

    getByMonth: () => {
        const incomesByMonts = outcomesStore.outcomes.value.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev),
            {}
        );
        return incomesByMonts
    }

});

window.outcomesStore = outcomesStore;