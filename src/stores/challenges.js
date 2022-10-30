import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { URI_DB_CHALLENGES } from '../helpers/constants';
import LCL_DB from '../../db.json';

const uri = {
  API:
    process.env.NODE_ENV !== 'production'
      ? URI_DB_CHALLENGES
      : URI_DB_CHALLENGES,
};
console.log(uri);

export const useChallengeStore = defineStore('challenge', () => {
  // state
  const challenge = ref(null);
  const challenges = ref([]);
  const error = ref({ status: false, message: '', type: '' });
  const loading = ref(false);

  // getters
  const getChallenge = computed(() => challenge);

  // actions
  async function postNewChallenge(data) {
    const payload = data;
    try {
      loading.value = false;
      await axios.post(uri.API, payload);
    } catch (error) {
      // set new error
    } finally {
      loading.value = true;
    }
  }
  // get all challenges
  async function getAllChallenges() {
    try {
      loading.value = false;
      const data = await axios.get(uri.API);
      challenges.value = data.data;
    } catch (error) {
      // set new error
    } finally {
      loading.value = true;
    }
  }

  return {
    challenge,
    challenges,
    getChallenge,
    postNewChallenge,
    getAllChallenges,
    error,
    loading,
  };
});
