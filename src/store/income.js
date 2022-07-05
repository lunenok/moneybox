import { makeAutoObservable, toJS } from "mobx";
import { addSumToEveryMonth, compareArray } from './../utils.ts';
import { writeIncomes } from './../api';

export const initialValue = {balance: 0, salary: 0, anotherIncomes: []};

export const incomesStore = makeAutoObservable({
    balance: 0,
    salary: 0,
    anotherIncomes: [],
    isLoading: true,

    save: ({salary, balance, anotherIncomes}) => {
        // тут нужен рефакторинг
        if (incomesStore.balance !== balance) {incomesStore.balance = parseInt(balance)}
        if (incomesStore.salary !== salary ) {incomesStore.salary = parseInt(salary)}
        if (!compareArray(toJS(incomesStore.anotherIncomes), anotherIncomes)) {incomesStore.anotherIncomes = anotherIncomes}
        writeIncomes({salary, balance, anotherIncomes});
        incomesStore.isLoading = false;
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
    },

    clean: () => {
        incomesStore.anotherIncomes = [];
        incomesStore.balance = 0;
        incomesStore.salary = 0;
        incomesStore.isLoading = true;
    },
});


window.incomesStore = incomesStore;