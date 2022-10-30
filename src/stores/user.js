import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
const default_photo =
  'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';

export const useUserStore = defineStore('user', () => {
  // state
  const user = ref(null);
  const loading = ref(false);
  const error = ref({ status: false, message: '', type: '' });

  // getters
  const isLoggedIn = computed(() => !!user.value);

  // actions
  async function signInFirebase({ email, password }) {
    resetError();
    loading.value = true;

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        this.user = response.user;
        response.user.displayName = email;
      } else {
        throw new Error('Login failed');
      }
    } catch (e) {
      const _message = e.message.replace('Firebase: ', '');
      error.value = {
        status: true,
        message: _message,
        type: 'error',
      };
    } finally {
      loading.value = false;
    }
  }

  async function signUpFirebase({ email, password, username }) {
    resetError();
    loading.value = true;
    // if (!data.terms) {
    //   this.error = 'You must accept the terms';
    //   this.loading = false;
    //   return;
    // }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;

      if (response) {
        // envia o usuario para o state
        user.value = response.user;

        // atualizar o usuario
        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: default_photo,
        });
      } else {
        throw new Error('Failed to register');
      }
    } catch (e) {
      const _message = e.message.replace('Firebase: ', '');
      error.value = {
        status: true,
        message: _message,
        type: 'error',
      };
    } finally {
      loading.value = false;
    }
  }

  // update user
  async function updateUserFirebase({ displayName, email, photoURL }) {
    return 1;
  }

  // fetch user on refresh
  async function fetchUserFirebase(_user) {
    if (_user) user.value = _user;
    else user.value = null;
  }

  //   logout firebase
  async function logOutFirebase() {
    await signOut(auth);
    user.value = null;
    resetError();
  }

  //   resets
  function resetError() {
    error.value = { status: false, message: '', type: '' };
  }
  return {
    user,
    loading,
    error,
    isLoggedIn,
    signInFirebase,
    signUpFirebase,
    logOutFirebase,
    fetchUserFirebase,
    updateUserFirebase,
    resetError,
  };
});
