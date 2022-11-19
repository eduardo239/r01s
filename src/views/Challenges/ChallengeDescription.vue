<script setup>
import { onMounted, ref } from "vue";
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
} from "naive-ui";
import { useChallengeStore } from "../../stores/challenges";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";

const challenge = useChallengeStore();
const user = useUserStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.params) {
    const cid = route.params.cid;
    challenge._getChallengeById(cid);
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
        <n-space vertical class="font-mono">
          <n-list>
            <n-list-item
              ><n-p>
                {{ $t("challenges.duration") }}:

                <n-text type="warning">
                  {{ challenge.challenge.duration + "s" || "---" }}
                </n-text>
              </n-p>
            </n-list-item>

            <n-list-item
              ><n-p>
                {{ $t("challenges.difficulty") }}:

                <n-text type="warning">
                  {{ challenge.challenge.difficulty || "---" }}
                </n-text>
              </n-p>
            </n-list-item>
            <n-list-item
              ><n-p>
                {{ $t("challenges.language") }}:
                <n-text type="warning">{{
                  challenge.challenge.language || "---"
                }}</n-text>
              </n-p>
            </n-list-item>
            <n-list-item
              ><n-p>
                ID:
                <n-text type="warning">{{ challenge.challenge.id }} </n-text>
              </n-p>
            </n-list-item>
            <n-list-item>
              <n-p>
                {{ $t("challenges.updated") }}:
                <n-text type="warning">
                  {{
                    new Date(challenge.challenge.updated_at).toLocaleString() ||
                    "---"
                  }}
                </n-text>
              </n-p>
            </n-list-item>
          </n-list>
        </n-space>

        <n-space vertical style="margin-top: 2rem">
          <n-button-group>
            <n-button @click="router.go(-1)">{{ $t("form.back") }}</n-button>

            <n-button
              @click="goToChallenge"
              type="success"
              :disabled="!user.isLoggedIn"
              >{{
                !user.isLoggedIn ? $t("auth.required.signin") : $t("form.start")
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
