import {makeAutoObservable, runInAction} from 'mobx';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {app} from './../firebase';

const auth = getAuth(app);

export const authStore = makeAutoObservable({
    name: '',
    uid: '',
    account: '',

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
        }).catch((error) => {
            alert(error)
        });
    },

    // getProfile: () => {
    //     return authStore.account;
    // },
});

window.auth = authStore;