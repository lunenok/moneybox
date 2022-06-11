import {makeAutoObservable, runInAction} from 'mobx';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {app} from './../firebase';
import { subsStore } from './regulars';
import { outcomesStore } from './outcomes';
import { incomesStore } from './income';
import { whishlistStore } from './whislist';

const auth = getAuth(app);

export const authStore = makeAutoObservable({
    name: '',
    uid: '',
    account: '',
    isAuth: false,

    register: (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              authStore.account = user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });
    },

    login: (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            runInAction(() => {
                authStore.account = user;
              });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });
    },

    signOut: () => {
        signOut(auth).then(() => {
            runInAction(() => {
                authStore.account = '';
              });
              subsStore.clean();
              outcomesStore.clean();
              incomesStore.clean();
              whishlistStore.clean();
        }).catch((error) => {
            alert(error)
        });
    },
});

window.auth = authStore;