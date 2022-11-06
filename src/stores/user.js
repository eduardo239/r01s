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
  const userLocalStorage = ref(null);
  const loading = ref(false);
  const error = ref({ status: false, message: '', type: '' });
  const correctAnswers = ref(0);
  const totalUserCompletedChallenges = ref(0);
  const totalUserPoints = ref(0);

  // getters
  const isLoggedIn = computed(() => !!user.value);

  const getTotalUserCompletedChallenges = computed(() => {
    if (userLocalStorage.value) {
      totalUserCompletedChallenges.value =
        userLocalStorage.value?.answers.length;
    }
  });

  const getTotalCorrectAnswers = computed(() => {
    if (userLocalStorage.value) {
      const _correct = userLocalStorage.value?.answers.filter((x) => x.correct);
      correctAnswers.value = _correct.length;
    }
  });

  const percentageCorrect = computed(() => {
    const ca = parseFloat(correctAnswers.value);
    const tc = parseFloat(totalUserCompletedChallenges.value);
    if (ca === 0 && tc === 0) {
      return '0.0%';
    } else {
      return ((ca / tc) * 100).toFixed(1) + '%';
    }
  });

  const getTotalUserPoints = computed(() => {
    if (userLocalStorage.value) {
      const tt = userLocalStorage.value?.answers;
      const cr = tt.filter((x) => x.correct);

      let result = 0;
      for (let i = 0; i < cr.length; i++) {
        result += cr[i].points;
      }
      totalUserPoints.value = result;
    }
  });

  // actions
  function updateUserLocalStorage(payload) {
    userLocalStorage.value = payload;
  }

  async function signInFirebase({ email, password }) {
    resetError();
    loading.value = true;

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      user.value = response.user;
      const displayName = response.user.displayName;
      const uid = response.user.uid;

      // adiciona informacoes do usuario no localStorage
      const _user = { displayName, email, uid, answers: [] };
      localStorage.setItem('user', JSON.stringify(_user));
      userLocalStorage.value = _user;
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

  async function signUpFirebase({ email, password, username, terms }) {
    resetError();
    loading.value = true;

    if (!terms) {
      error.value = {
        status: true,
        message: 'You must accept the terms',
        type: 'warning',
      };
      loading.value = false;
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;

      // envia o usuario para o state
      user.value = response.user;

      // atualizar o usuario
      await updateProfile(auth.currentUser, {
        displayName: username,
        photoURL: default_photo,
      });

      // adiciona informacoes do usuario no localStorage
      const _user = { displayName: username, email, uid, answers: [] };
      localStorage.setItem('user', JSON.stringify(_user));
      userLocalStorage.value = _user;
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
    localStorage.removeItem('user');
    loading.value = false;
    resetError();
  }

  // salva a resposta do usuario
  async function saveUserAnswer({ cid, uid, correct, points }) {
    resetError();
    loading.value = true;

    try {
      // atualiaza o localStorage
      const _localUser = JSON.parse(localStorage.getItem('user'));
      _localUser.answers.push({ cid, uid, correct, points });
      localStorage.setItem('user', JSON.stringify(_localUser));

      userLocalStorage.value = _localUser;
    } catch (error) {
      // config error
    } finally {
      loading.value = false;
    }
  }

  //   resets
  function resetError() {
    error.value = { status: false, message: '', type: '' };
  }

  //

  return {
    user,
    userLocalStorage,
    updateUserLocalStorage,
    loading,
    error,
    isLoggedIn,
    signInFirebase,
    signUpFirebase,
    logOutFirebase,
    fetchUserFirebase,
    updateUserFirebase,
    resetError,
    saveUserAnswer,
    correctAnswers,
    totalUserCompletedChallenges,
    totalUserPoints,
    percentageCorrect,
    getTotalUserCompletedChallenges,
    getTotalCorrectAnswers,
    getTotalUserPoints,
  };
});
