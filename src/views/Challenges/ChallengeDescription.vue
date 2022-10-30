<script setup>
import { onMounted, ref } from 'vue';
import {
  NCard,
  NText,
  NListItem,
  NList,
  NP,
  NSpace,
  NLayout,
  NButtonGroup,
  NButton,
} from 'naive-ui';
import { useChallengeStore } from '../../stores/challenges';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';

const challenge = useChallengeStore();
const user = useUserStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.params) {
    const cid = route.params.cid;
    challenge.getChallengeById(cid);
  }
});

const goToChallenge = () => {
  router.push(`/challenge/${route.params.cid}`);
};
</script>

<template>
  <n-space vertical v-if="challenge.challenge">
    <n-layout>
      <n-card v-if="challenge" :title="challenge.challenge.question">
        <n-space vertical>
          <n-list>
            <n-list-item
              ><n-p>
                Difficulty:
                <n-text type="warning" strong>
                  {{ challenge.challenge.difficulty }}
                </n-text>
              </n-p>
            </n-list-item>
            <n-list-item
              ><n-p>
                Language:
                <n-text type="error" strong>{{
                  challenge.challenge.language
                }}</n-text>
              </n-p>
            </n-list-item>
            <n-list-item
              ><n-p> ID: {{ challenge.challenge.id }} </n-p>
            </n-list-item>
            <!-- <n-list-item>
              <n-p>
                Updated:
                {{ new Date(challenge.updated_at).toLocaleString() }}
              </n-p>
            </n-list-item> -->

            <!-- <n-p>
              Finished:
              <n-text type="success">{{ user.alreadyFinished }}</n-text>
            </n-p> -->
          </n-list>
        </n-space>

        <n-space vertical style="margin-top: 2rem">
          <n-button-group>
            <router-link :to="`/challenges`">
              <n-button>back</n-button>
            </router-link>

            <n-button
              @click="goToChallenge"
              type="success"
              :disabled="!user.isLoggedIn"
              >{{
                !user.isLoggedIn ? 'You need to be registred' : 'Start Test Now'
              }}</n-button
            >
            <!-- <n-button
              @click="() => goToChallenge()"
              type="success"
              :disabled="user.alreadyFinished"
            >
              {{
                user.alreadyFinished ? 'Challenge Already Finished' : 'Start'
              }}
            </n-button> -->
          </n-button-group>
        </n-space>
      </n-card>
    </n-layout>
  </n-space>

  <n-card title="Challenge not found!" v-else></n-card>
</template>
