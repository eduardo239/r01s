<script setup>
import { ref } from 'vue';
import {
  NSpace,
  NLayout,
  NCard,
  NGrid,
  NGridItem,
  NButton,
  NList,
  NListItem,
} from 'naive-ui';
import { useUserStore } from '../../stores/user';
import UserStats from './UserHome.vue';
import { URI_DEFAULT_AVATAR } from '../../helpers/constants';

const user = useUserStore();
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="User Profile">
        <n-grid :span="24" :x-gap="24">
          <n-grid-item :span="6">
            <!-- menu -->
            <n-space vertical v-if="user.isLoggedIn">
              <n-list bordered>
                <n-list-item>
                  <n-space align="center" vertical>
                    <n-avatar
                      round
                      :size="120"
                      :src="user.photoURL || URI_DEFAULT_AVATAR"
                    />
                    <n-text>
                      {{ user.user.displayName }}
                    </n-text>
                  </n-space>
                </n-list-item>
              </n-list>

              <router-link :to="`/profile/${user.user.uid}/stats`">
                <n-button strong secondary block type="success">
                  Stats
                </n-button>
              </router-link>

              <router-link :to="`/profile/${user.user.uid}/edit`">
                <n-button strong secondary block type="success">
                  Edit
                </n-button>
              </router-link>

              <!-- <n-button
            strong
            secondary
            block
            type="success"
            @click="ui.switchTheme"
          >
            Switch Theme
          </n-button> -->

              <router-link v-if="user.isLoggedIn" to="/">
                <n-button
                  strong
                  secondary
                  block
                  type="error"
                  @click="user.logOutFirebase"
                >
                  Exit
                </n-button>
              </router-link>
            </n-space>
          </n-grid-item>
          <n-grid-item :span="18">
            <!-- tabs -->
            <n-space>
              <!--  -->
              <router-view></router-view>
            </n-space>
          </n-grid-item>
        </n-grid>
      </n-card>
    </n-layout>
  </n-space>
</template>
