import {FormikErrors, FormikValues, getIn} from 'formik';
import {MonthFlow} from './types/types';

export const showErrorMessageFormik = (touched: boolean, errors: FormikErrors<FormikValues>, name: string) => {
    const wasTouched = getIn(touched, name)
    const error = getIn(errors, name)
    return wasTouched && error ? error : ''
};

export const isErrorFormik = (touched: boolean, errors: FormikErrors<FormikValues>, name: string) => {
    const wasTouched = getIn(touched, name)
    const error = getIn(errors, name)
    return Boolean(wasTouched && error)
};

export const addSumToEveryMonth = (data: Array<number>, sum: number): MonthFlow => {
    const object = {...data };
    const newObject: MonthFlow = {}; //  Вот оно
    for (let i = 1; i <= 12; i++) {
      newObject[i] = sum;
    }
    for (const month in object) {
      newObject[month] += object[month];
    }
    return newObject;
}

export const createArrayCashFlow = (obj: MonthFlow) : Array<number> => {
    const arr: Array<number> = [];
    for (let i = 1; i <= 12; i++) {
        arr.push(0);
    }
    for (const month in obj) {
        const index = parseInt(month);
        arr[index - 1] = obj[month];
    }
    return arr;
};

export const calculateBalance = (incomes: Array<number>, outcomes: Array<number>, whishes: Array<number>) : Array<number> => {
    const arr: Array<number> = [];
    for (let i = 0; i <= 11; i++) {
        arr[i] = incomes[i] - outcomes[i] - whishes[i];
    }
    return arr
}

export const calculateSum = (balance: Array<number>, startingMoney: number) : Array<number> => {
    const newArr: Array<number> = [];
    balance.reduce((prev, curr, index) => {
        return newArr[index] = curr + prev
    }, startingMoney)
    return newArr;
}

export const compareArray = (arr1: Array<any>, arr2: Array<any>) : boolean => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const getOutcomesWithPercentOfSave = (outcomes: Array<number>, incomes: Array<number>, amount: number, percent: string) : Array<number> => {
    if (percent === 'yes') {
        const withPercent = [...outcomes];
        const incomesArray = [...incomes];
        for (let i = 0; i <= 11; i++) {
            withPercent[i] = Math.round(incomesArray[i] * (amount/100) + outcomes[i]);
        }
        return withPercent;
    }
    return Object.values(addSumToEveryMonth(outcomes, amount));
};

export const getSaveAmount = (incomes: MonthFlow, amount: number, isPercent: string) : number => {
    let save = 0;
    if (isPercent === 'yes') {
        const incomesArray = {...incomes};
        for (let i = 1; i <= 12; i++) {
            save += Math.round(incomesArray[i] * (amount/100));
        }
        return save;
    }
    return amount * 12;
};