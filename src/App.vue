<script setup>
import { auth } from './firebaseConfig';
import { useChallengeStore } from './stores/challenges';
import { onMounted } from 'vue';
import { NLayout, NConfigProvider } from 'naive-ui';
import MainMenu from './components/ui/MainMenu.vue';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const challenge = useChallengeStore();
console.log(challenge);

onMounted(() => {
  console.log('mounted');
});
</script>

<template>
  <n-config-provider :hljs="hljs">
    <n-layout class="body-wrapper">
      <main-menu />
      <router-view />
    </n-layout>
  </n-config-provider>
</template>
