import { makeAutoObservable } from 'mobx'

export const subsStore = makeAutoObservable({
  subs: [
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
    }
  ],

  save: (subs) => {
    subsStore.subs = subs
  },
});

window.subsStore = subsStore