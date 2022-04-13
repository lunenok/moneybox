import { makeAutoObservable } from "mobx";

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
    }
});