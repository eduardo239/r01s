<script setup>
import { ref } from 'vue';

const count = ref(0);

const props = defineProps({
  language: String,
  code: String,
});
</script>

<template>
  <n-space class="code-container">
    <n-code class="code" :code="code" :language="language" />
  </n-space>
</template>
