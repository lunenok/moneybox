import { makeAutoObservable } from 'mobx';

const regularMock = [
    {
        id: 1,
        description: 'netflix',
        amount: 999,
        currency: 'rub'
    },
    {
        id: 2,
        description: 'mobile phone',
        amount: 650,
        currency: 'rub'
    },
    {
        id: 3,
        description: 'internet',
        amount: 550,
        currency: 'rub'
    },
    {
        id: 4,
        description: 'rental',
        amount: 15000,
        currency: 'rub'
    }
];

export const subsStore = makeAutoObservable({
  subs: regularMock,

  save: (subs) => {
    subsStore.subs = subs
  },
});

window.subsStore = subsStore;