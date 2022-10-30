<script setup>
import { ref } from 'vue';
import { NButton, NSpace, NAvatar } from 'naive-ui';
import { useUserStore } from '../../stores/user';
import logo_c from '../../assets/logo/png/logo-no-background_c.png';

const default_photo = ref(
  'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
);
const user = useUserStore();

const count = ref(0);
</script>

<template>
  <n-space class="menu" justify="space-between" align="center">
    <n-space align="center">
      <!--  -->
      <router-link to="/">
        <img :src="logo_c" class="logo" alt="Challenge your knowledge" />
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
    <n-space align="center">
      <!--  -->
      <router-link to="/auth" v-if="!user.isLoggedIn">
        <n-button text type="primary"> SIGN IN </n-button>
      </router-link>
      <!--  -->
      <router-link v-if="user.isLoggedIn" to="/">
        <n-button text type="primary" @click="user.logOutFirebase">
          Exit
        </n-button>
      </router-link>
      <!--  -->

      <router-link v-if="user.isLoggedIn" :to="`/profile/${user.user.uid}`">
        <n-avatar round size="small" :src="user.photoURL || default_photo" />
      </router-link>
    </n-space>
  </n-space>
</template>
