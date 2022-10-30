import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // state
  const theme = ref(null);

  // getters
  const getTheme = computed(() => theme);

  // actions
  function switchTheme() {
    return 1;
  }

  return { theme, getTheme, switchTheme };
});
