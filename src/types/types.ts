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