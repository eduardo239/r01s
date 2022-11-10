import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { darkTheme, lightTheme } from 'naive-ui';

export const useThemeStore = defineStore('theme', () => {
  // state
  const theme = ref(darkTheme);

  // getters
  const getTheme = computed(() => theme.value);

  // actions
  function switchTheme() {
    if (theme.value === null) {
      theme.value = darkTheme;
      saveThemeLocalStorage('dark');
    } else if (theme.value.name === 'dark') {
      theme.value = lightTheme;
      saveThemeLocalStorage('light');
    } else {
      theme.value = darkTheme;
      saveThemeLocalStorage('dark');
    }
  }

  // salva no localStorage
  function saveThemeLocalStorage(name) {
    localStorage.setItem('theme', name);
  }

  // atualiza o tema com o do localStorage
  function loadLocalStorageTheme() {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'light') theme.value = lightTheme;
    else theme.value = darkTheme;
  }

  return { theme, getTheme, switchTheme, loadLocalStorageTheme };
});
