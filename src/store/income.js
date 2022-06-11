import { makeAutoObservable, toJS } from "mobx";
import { addSumToEveryMonth, compareArray } from './../utils';
import { writeIncomes } from './../api';

export const incomesStore = makeAutoObservable({
    balance: 0,
    salary: 100000,
    anotherIncomes: [
        {
            id: 1,
            description: 'premium',
            amount: 100000,
            month: 5,
            currency: 'rub'

        }
    ],

    save: ({salary, balance, anotherIncomes}) => {
        // тут нужен рефакторинг
        if (incomesStore.balance !== balance) {incomesStore.balance = balance}
        if (incomesStore.salary !== salary ){incomesStore.salary = salary}
        if (!compareArray(toJS(incomesStore.anotherIncomes), anotherIncomes)) {incomesStore.anotherIncomes = anotherIncomes}
        writeIncomes({salary, balance, anotherIncomes});
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