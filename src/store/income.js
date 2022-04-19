import { makeAutoObservable } from "mobx";
import { addSumToEveryMonth } from './../utils';

const incomeMock = {
    balance: 30000,
    salary: 100000,
    anotherIncomes: [
        {
            id: 1,
            description: 'gift',
            amount: 13000,
            month: 9,
            currency: 'rub'

        }
    ]
};

export const incomesStore = makeAutoObservable({
    incomes: incomeMock,

    save: (incomes) => {
        incomesStore.incomes = incomes
    },

    getByMonth: () => {
        const incomesByMonts = incomesStore.incomes.anotherIncomes.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev),
            {}
        );
        return addSumToEveryMonth(incomesByMonts, incomesStore.incomes.salary);
    }
});