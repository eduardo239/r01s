import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useChallengeStore = defineStore('challenge', () => {
  // state
  const challenge = ref(null);

  // getters
  const getChallenge = computed(() => challenge);

  // actions
  function postNewChallenge() {
    return 1;
  }

  return { challenge, getChallenge, postNewChallenge };
});
