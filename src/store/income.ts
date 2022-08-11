import { makeAutoObservable, toJS } from "mobx";
import { compareArray } from './../utils';
import { writeIncomes } from '../api';
import { PaymentType } from "../types/types";
import { Incomes } from "../types/types";

export const initialValue = {balance: 0, salary: 0, anotherIncomes: []};

export const incomesStore = makeAutoObservable({
    balance: 0,
    salary: 0,
    anotherIncomes: [{}] as Array<PaymentType>,
    isLoading: true,

    save: ({salary, balance, anotherIncomes} : Incomes) => {
        // тут нужен рефакторинг
        if (incomesStore.balance !== balance) {incomesStore.balance = balance}
        if (incomesStore.salary !== salary ) {incomesStore.salary = salary}
        if (!compareArray(toJS(incomesStore.anotherIncomes), anotherIncomes)) {incomesStore.anotherIncomes = anotherIncomes}
        writeIncomes({salary, balance, anotherIncomes});
        incomesStore.isLoading = false;
    },

    getTotal: () => {
        let total = 0;
        total = incomesStore.salary * 12;
        incomesStore.anotherIncomes.forEach((el) => {
            total += el.amount;
        });
        return total; 
    },

    getByMonth: () => {
        const incomesByMonts = incomesStore.anotherIncomes.reduce(
            (acc, cur) => (((acc[cur.month] = (acc[cur.month] || 0) + cur.amount), acc)),
            {} as {[index: string]: number}
        );
        const obj = {} as {[index: string]: number};
        for (let i = 1; i <= 12; i++) {
            obj[i] = incomesStore.salary + (incomesByMonts[i] || 0);
          }
        return obj;
    },

    clean: () => {
        incomesStore.anotherIncomes = [{id: 0, description: '', month: 0, amount: 0, currency: 'rub'}];
        incomesStore.balance = 0;
        incomesStore.salary = 0;
        incomesStore.isLoading = true;
    },
});
