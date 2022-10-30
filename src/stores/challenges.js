import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { URI_DB_CHALLENGES } from '../helpers/constants';
import { v4 as uuidv4 } from 'uuid';
import LCL_DB from '../../db.json';

const uri = {
  API:
    process.env.NODE_ENV !== 'production'
      ? URI_DB_CHALLENGES
      : URI_DB_CHALLENGES,
};

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
    loading.value = true;
    const updated_at = new Date();
    const created_at = new Date();
    const payload = {
      ...data,
      updated_at,
      created_at,
      id: uuidv4(),
    };
    try {
      const { status } = await axios.post(uri.API, payload);
      const ok = status.toString().startsWith('2');
      if (ok) getAllChallenges();
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }
  }
  // get all challenges
  async function getAllChallenges() {
    loading.value = true;
    try {
      const data = await axios.get(uri.API);
      challenges.value = data.data.reverse();
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }
  }
  // get by id
  async function getChallengeById(cid) {
    loading.value = true;
    try {
      const data = await axios.get(uri.API + cid);
      challenge.value = data.data;
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }
  }

  // delete challenge
  async function deleteChallengeById(cid) {
    loading.value = true;

    try {
      const { status } = await axios.delete(uri.API + cid);
      const ok = status.toString().startsWith('2');
      if (ok) getAllChallenges();
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }

    return false;
  }
  return {
    challenge,
    challenges,
    getChallenge,
    postNewChallenge,
    getAllChallenges,
    getChallengeById,
    deleteChallengeById,
    error,
    loading,
  };
});
