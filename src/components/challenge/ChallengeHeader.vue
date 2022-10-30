<script setup>
import { ref, defineProps } from 'vue';
import { NSpace, NText } from 'naive-ui';

const props = defineProps([
  'id',
  'question',
  'difficulty',
  'language',
  'timer',
]);
</script>

<template>
  <n-space style="padding: 2rem 0">
    <n-text depth="3">ID # {{ id }}</n-text>
    <n-text depth="3">Difficulty # {{ difficulty ?? 0 }}</n-text>
    <n-text type="error"
      >Timer # {{ timer ? timer : 0 }} tenth of a second</n-text
    >
  </n-space>
</template>
