<script setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';

const count = ref(0);
</script>

<template>
  <router-link to="/">
    <n-button text type="primary"> HOME </n-button>
  </router-link>
  <!--  -->
  <router-link to="/challenges">
    <n-button text type="primary"> CHALLENGES </n-button>
  </router-link>
  <!--  -->
  <router-link to="/add/challenges">
    <n-button text type="primary"> ADD </n-button>
  </router-link>
</template>
