<script setup>
import { auth } from './firebaseConfig';
import { mapActions } from 'pinia';
import { useChallenge } from '@/stores/challenges';
import { onMounted } from 'vue';
import { NLayout } from 'naive-ui';
import MainMenu from '@/components/menu/MainMenu';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

onMounted(() => {
  console.log('moiunted');
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
