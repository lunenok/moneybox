import { makeAutoObservable, toJS } from "mobx";
import { addSumToEveryMonth, compareArray } from './../utils';

export const incomesStore = makeAutoObservable({
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
    ],

    save: ({salary, balance, anotherIncomes}) => {
        if (incomesStore.balance !== balance) {incomesStore.balance = balance};
        if (incomesStore.salary !== salary ){incomesStore.salary = salary};
        if (!compareArray(toJS(incomesStore.anotherIncomes), anotherIncomes)) {incomesStore.anotherIncomes = anotherIncomes};
    },

    getTotal: () => {
        let total = 0;
        total = parseInt(incomesStore.salary) * 12;
        incomesStore.anotherIncomes.forEach((el) => {
            total += parseInt(el.amount);
        });
        return total;
    },

    getByMonth: () => {
        const incomesByMonts = incomesStore.anotherIncomes.reduce(
            (prev, cur) => ((prev[cur.month] = (parseInt(prev[cur.month]) || 0) + parseInt(cur.amount)), prev),
            {}
        );
        return addSumToEveryMonth(incomesByMonts, incomesStore.salary);
    }
});