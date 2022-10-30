<script setup>
import { ref } from 'vue';
import {} from 'naive-ui';

const props = defineProps(['message']);

const count = ref(0);
</script>

<template>
  <n-alert title="Success Text" :type="message.type">
    {{ message.message }}
  </n-alert>
</template>
