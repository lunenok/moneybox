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

export type Sub = {
    id: number, 
    description: string, 
    amount: number, 
    currency: string
};

export type RegularsType = {
    subs: Array<Sub>
};

export type OutcomesKinds = 'Payments' | 'Car' | 'Holidays';

export interface PushCallback {
    (data: PaymentType): void;
};
