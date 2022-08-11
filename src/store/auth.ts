import {makeAutoObservable, runInAction} from 'mobx';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {app} from '../firebase';
import { subsStore } from './regulars';
import { outcomesStore } from './outcomes';
import { incomesStore } from './income';
import { whishlistStore } from './whislist';

const auth = getAuth(app);

export const authStore = makeAutoObservable({
    account: {},
    isAuth: false,

    register: (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              runInAction(() => {
                authStore.account = user;
                authStore.isAuth = true;
            });
        })
        .catch((error) => {
            const errorCode : number = error.code;
            const errorMessage : string = error.message;
            alert(errorCode + errorMessage)
        });
    },

    login: (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            runInAction(() => {
                authStore.account = user;
                authStore.isAuth = true;
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + errorMessage)
        });
    },

    signOut: () => {
        signOut(auth).then(() => {
            runInAction(() => {
                authStore.account = '';
                subsStore.clean();
                outcomesStore.clean();
                incomesStore.clean();
                whishlistStore.clean();
                authStore.isAuth = false;
              });
        }).catch((error) => {
            alert(error)
        });
    },

    checkAuth: () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                runInAction(() => {
                    authStore.account = user;
                    authStore.isAuth = true;
                })
                
            } else {
                console.log('user is sign out')
            }
        })
    },
});

export type AuthStore = typeof authStore;
