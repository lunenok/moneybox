import { makeAutoObservable } from "mobx";

export const appStore = makeAutoObservable({
    app: {
        lastTab: 0
    },

    changeTab: (index) => {
        appStore.app.lastTab = index;
    }
})