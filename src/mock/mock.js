const mock = {
    user: {
        id: 1,
        name: 'maksim',
    },
    subs: [
        {
            index: 1,
            description: 'netflix',
            amount: 999,
            currency: 'rub'
        },
        {
            index: 2,
            description: 'mobile phone',
            amount: 650,
            currency: 'rub'
        },
        {
            index: 3,
            description: 'internet',
            amount: 550,
            currency: 'rub'
        },
    ],
    whishList: [
        {
            index: 1,
            description: 'iphone 11',
            amount: 55000,
            currency: 'rub',
            month: 4
        },
        {
            index: 2,
            description: 'adidas nmd_r1',
            amount: 16000,
            currency: 'rub',
            month: 7
        }
    ],
    income: {
        amount: 100000,
        currency: 'rub'
    }
}

export default mock