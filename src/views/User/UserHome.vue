<script setup>
import { ref } from "vue";
import {
  NSpace,
  NLayout,
  NCard,
  NGrid,
  NGridItem,
  NButton,
  NList,
  NListItem,
} from "naive-ui";
import { useUserStore } from "../../stores/user";
import UserStats from "./UserHome.vue";
import { URI_DEFAULT_AVATAR } from "../../helpers/constants";
import {
  DataTable,
  Edit as TheEdit,
  Logout as TheLogout,
} from "@vicons/carbon";

const user = useUserStore();
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="User Profile">
        <n-grid cols="4" item-responsive :x-gap="24">
          <n-grid-item span="4 500:1">
            <!-- menu -->
            <n-space vertical v-if="user.isLoggedIn">
              <n-list bordered>
                <n-list-item>
                  <n-space align="center" vertical>
                    <n-avatar
                      round
                      :size="90"
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
                  <n-icon size="22" style="margin-right: 10px">
                    <data-table />
                  </n-icon>
                  {{ $t("user.menu.stats") }}
                </n-button>
              </router-link>

              <router-link :to="`/profile/${user.user.uid}/edit`">
                <n-button strong secondary block type="success">
                  <n-icon size="22" style="margin-right: 10px">
                    <the-edit />
                  </n-icon>
                  {{ $t("user.menu.edit") }}
                </n-button>
              </router-link>

              <router-link v-if="user.isLoggedIn" to="/">
                <n-button
                  strong
                  secondary
                  block
                  type="error"
                  @click="user.logOutFirebase"
                >
                  <n-icon size="22" style="margin-right: 10px">
                    <the-logout />
                  </n-icon>
                  {{ $t("user.menu.exit") }}
                </n-button>
              </router-link>
            </n-space>
          </n-grid-item>
          <n-grid-item span="4 500:3">
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
