export type PaymentType = {
    id: number,
    month: number,
    currency: string,
    description: string,
    amout: number,
};

export type MonthFlow = {
    [month: string] : number
};