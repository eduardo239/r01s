<script setup>
import { auth } from './firebaseConfig';
import { useChallengeStore } from './stores/challenges';
import { useThemeStore } from './stores/theme';
import { onMounted } from 'vue';
import { NLayout, NConfigProvider, darkTheme } from 'naive-ui';
import { useUserStore } from './stores/user';

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
    if (_user) user.fetchUserFirebase(_user);
  });

  // set all challenges from db
  challenge._getAllChallenges();
});
</script>

<template>
  <n-config-provider :hljs="hljs" :theme="darkTheme">
    <n-layout class="main-container">
      <main-menu />
      <router-view />
    </n-layout>
  </n-config-provider>
</template>
