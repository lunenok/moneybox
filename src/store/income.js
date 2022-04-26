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

    getTotal: () => {
        let total = 0;
        total = parseInt(incomesStore.incomes.salary) * 12;
        incomesStore.incomes.anotherIncomes.forEach((el) => {
            total += parseInt(el.amount);
        });
        return total;
    },

    getByMonth: () => {
        const incomesByMonts = incomesStore.incomes.anotherIncomes.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev),
            {}
        );
        return addSumToEveryMonth(incomesByMonts, incomesStore.incomes.salary);
    }
});