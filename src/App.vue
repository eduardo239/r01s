<script setup>
import { auth } from './firebaseConfig';
import { onMounted } from 'vue';
import { useUserStore } from './stores/user';
import { useThemeStore } from './stores/theme';
import { useChallengeStore } from './stores/challenges';
import { NLayout, NConfigProvider } from 'naive-ui';

import MainMenu from './components/ui/MainMenu.vue';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);

const challenge = useChallengeStore();
const theme = useThemeStore();

const user = useUserStore();

onMounted(() => {
  auth.onAuthStateChanged((_user) => {
    if (_user) {
      user.fetchUserFirebase(_user);

      user.updateUserLocalStorage(JSON.parse(localStorage.getItem('user')));
    }
  });

  // set all challenges from db
  challenge._getAllChallenges();

  theme.loadLocalStorageTheme();
});
</script>

<template>
  <n-config-provider :hljs="hljs" :theme="theme.getTheme">
    <n-layout class="main-container">
      <main-menu msg="test" />
      <router-view />
      <n-global-style />
    </n-layout>
  </n-config-provider>
</template>
