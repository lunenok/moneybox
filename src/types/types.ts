export type PaymentType = {
    id: number,
    month: number,
    currency: string,
    description: string,
    amount: number,
};

export type MonthFlow = {
    [month: string] : number
};

export interface Incomes {
    balance: number,
    salary: number,
    anotherIncomes: Array<PaymentType>
};

export type Whishlist = {
    save: number,
    percent: 'yes' | 'no',
    stuff: Array<PaymentType>
}

export type OutcomesKinds = 'Payments' | 'Car' | 'Holidays';
