import {getIn} from 'formik';

export const showErrorMessageFormik = (touched, errors, name) => {
    const wasTouched = getIn(touched, name)
    const error = getIn(errors, name)
    return wasTouched && error? error : ''
        
};

export const isErrorFormik = (touched, errors, name) => {
    const wasTouched = getIn(touched, name)
    const error = getIn(errors, name)
    return Boolean(wasTouched && error)
};

export const addSumToMonth = (data, sum) => {
    const object = {...data};
    const keys = Object.keys(object);
    const length = keys.length;
    for (let i = 0; i <= length - 1; i++) {
        let index = keys[i];
        object[index] += sum;
    }
    return object;
};

export const addSumToEveryMonth = (data, sum) => {
    const object = { ...data };
    const newObject = {};
    for (let i = 0; i <= 11; i++) {
      newObject[i] = parseInt(sum);
    }
    for (const month in object) {
      newObject[month] += object[month];
    }
    return newObject;
}

export const createArrayCashFlow = (obj) => {
    const arr = [];
    for (let i = 1; i <= 12; i++) {
        arr.push(0);
    }
    for (const month in obj) {
        arr[month] = obj[month];
    }
    return arr;
};

export const calculateBalance = (incomes, outcomes, whishes) => {
    const arr = [];
    for (let i = 0; i <= 11; i++) {
        arr[i] = incomes[i] - outcomes[i] - whishes[i];
    }
    return arr
}

export const calculateSum = (balance, startingMoney) => {
    const newArr = []
    balance.reduce((prev, curr, index) => {
        return newArr[index] = parseInt(curr) + parseInt(prev)
    }, parseInt(startingMoney))
    return newArr;
}

export const compareArray = (arr1, arr2) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export const getOutcomesWithPercentOfSave = (outcomes, incomes, amount, percent) => {
    if (percent === 'yes') {
        const withPercent = {...outcomes};
        const incomesArray = {...incomes};
        for (let i = 0; i <= 11; i++) {
            withPercent[i] = Math.round(incomesArray[i] * (amount/100) + outcomes[i]);
        }
        return withPercent;
    }
    return addSumToEveryMonth(outcomes, amount);
};

export const getSaveAmount = (incomes, amount, isPercent) => {
    let save = 0;
    if (isPercent === 'yes') {
        const incomesArray = {...incomes};
        for (let i = 0; i <= 11; i++) {
            save += Math.round(incomesArray[i] * (amount/100));
        }
        return save;
    }
    return parseInt(amount * 12);
};