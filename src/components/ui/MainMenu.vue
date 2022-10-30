<script setup>
import { ref } from 'vue';
import { NButton, NSpace, NAvatar } from 'naive-ui';

const count = ref(0);
</script>

<template>
  <n-space class="menu" justify="space-between" align="center">
    <n-space>
      <!--  -->
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
      <!--  -->
    </n-space>
    <!--  -->
    <!--  -->
    <n-space>
      <router-link :to="`/profile/${1}`">
        <n-avatar
          round
          size="small"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </router-link>
    </n-space>
  </n-space>
</template>
