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

// percent: 'yes' | 'no' - не работает
export type Whishlist = {
    save: number,
    percent: string,
    stuff: Array<PaymentType>
}