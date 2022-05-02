import { makeAutoObservable } from "mobx";

export const appStore = makeAutoObservable({
    currentMonth: new Date().getMonth(),

    changeCurrentMonth: (month) => {
        appStore.currentMonth = month
    }
})
