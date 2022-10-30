<script setup>
import { ref } from 'vue';
import { NButton, NSpace, NAvatar } from 'naive-ui';
import { useUserStore } from '../../stores/user';
import { URI_DEFAULT_AVATAR } from '../../helpers/constants';
import logo_c from '../../assets/logo/png/logo-no-background_c.png';

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
      <router-link to="/add/challenges" v-if="user.isLoggedIn">
        <n-button text type="primary"> ADD </n-button>
      </router-link>
      <!--  -->
      <router-link to="/all/challenges" v-if="user.isLoggedIn">
        <n-button text type="primary"> ALL </n-button>
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
          Logout
        </n-button>
      </router-link>
      <!--  -->

      <router-link
        v-if="user.isLoggedIn"
        :to="`/profile/${user.user.uid}/stats`"
      >
        <n-avatar
          round
          size="small"
          :src="user.photoURL || URI_DEFAULT_AVATAR"
        />
      </router-link>
    </n-space>
  </n-space>
</template>
