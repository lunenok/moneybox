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

export type Outcome = {
    title: string,
    payments: Array<PaymentType>
}

export type WhishlistType = {
    save: number,
    percent: 'yes' | 'no',
    stuff: Array<PaymentType>
};

export type IncomesType = {
    balance: number,
    salary: number,
    anotherIncomes: Array<PaymentType>
};

export type OutcomesType = {
    outcomes: Array<Outcome>
};

export type RegularsType = {
    regulars: Array<PaymentType>
};

export type OutcomesKinds = 'Payments' | 'Car' | 'Holidays';
