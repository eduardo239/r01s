import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { URI_DB_CHALLENGES } from '../helpers/constants';
import DB_JSON from '../../db.json';

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
  const challengesLimited = ref([]);
  const challegensPagination = ref([]);

  const error = ref({ status: false, message: '', type: '' });
  const loading = ref(false);

  // getters
  const getTotalChallenges = computed(() =>
    challenges ? challenges.value.length : 0
  );
  const getTotalChallengesPagination = computed(
    () => challegensPagination && challegensPagination.value.length
  );

  // actions
  // save new challenge
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
  async function _postNewChallenge(data) {
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
      const alreadyExists = findByUUID(payload.id, challenges.value);

      if (!alreadyExists) {
        challenges.value.push(payload);
      } else {
        // set exists error
      }
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
  async function _getAllChallenges() {
    loading.value = true;

    try {
      challenges.value = DB_JSON.challenges;
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
  async function _getChallengeById(cid) {
    loading.value = true;
    try {
      const response = filterByUUID(cid, challenges.value);
      challenge.value = response;
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
  }
  async function _deleteChallengeById(cid) {
    loading.value = true;
    try {
      const alreadyExists = findByUUID(cid, challenges.value);

      if (alreadyExists) {
        const response = removeItemByUUID(cid, challenges.value);
        challenges.value = response;
      } else {
        console.log(2);
      }
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }
  }

  // pagination
  async function getAllPaginationChallenges({ page, _limit }) {
    loading.value = true;

    try {
      const _uri = `${uri.API}?_page=${page}&_limit=${_limit}`;
      const { status, data } = await axios.get(_uri);
      const ok = status.toString().startsWith('2');
      if (ok) challegensPagination.value = data;
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }
  }
  async function _getAllPaginationChallenges({ page, _limit }) {
    loading.value = true;

    try {
      const response = paginate(challenges.value, _limit, page);
      challengesLimited.value = response;
    } catch (error) {
      // set new error
    } finally {
      loading.value = false;
    }
  }

  // find by uuid
  function findByUUID(uuid, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === uuid) {
        return true;
      }
    }
    return false;
  }

  // filter array and remove
  function removeItemByUUID(uuid, array) {
    return array.filter((item) => item.id !== uuid);
  }

  // paginate
  function paginate(array, limit, page) {
    return array.slice((page - 1) * limit, page * limit);
  }

  // filter by uuid
  function filterByUUID(uuid, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === uuid) {
        return array[i];
      }
    }
    return null;
  }

  // reset
  function resetChallenge() {
    challenge.value = null;
  }

  return {
    challenge,
    challenges,
    challengesLimited,
    challegensPagination,
    getTotalChallenges,
    getAllPaginationChallenges,
    getTotalChallengesPagination,
    postNewChallenge,
    getAllChallenges,
    getChallengeById,
    deleteChallengeById,
    error,
    loading,
    _postNewChallenge,
    _getAllChallenges,
    _deleteChallengeById,
    _getAllPaginationChallenges,
    _getChallengeById,
    resetChallenge,
  };
});
