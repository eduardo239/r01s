<script setup>
import { onMounted, ref } from "vue";
import { NButton, NList, NThing, NListItem, NTag, NPagination } from "naive-ui";
import { useChallengeStore } from "../../stores/challenges";
import { ArrowRight } from "@vicons/carbon";

const challenge = useChallengeStore();

const page = ref(1);
const limit = ref(5);
const total = ref(0);

onMounted(() => {
  challenge._getAllPaginationChallenges({
    page: page.value,
    _limit: limit.value,
  });

  total.value = limit.value * page.value + 1;
});

function prev(pagination) {
  challenge._getAllPaginationChallenges({
    page: pagination.page,
    _limit: limit.value,
  });
}

function next(pagination) {
  challenge._getAllPaginationChallenges({
    page: pagination.page,
    _limit: limit.value,
  });
}
</script>

<template>
  <n-list
    bordered
    v-for="ch in challenge.challengesLimited"
    :key="ch.id"
    style="margin-bottom: 0.25rem"
  >
    <n-list-item>
      <n-thing :title="ch.question">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              {{ ch.duration || "--" }}s
            </n-tag>

            <n-tag :bordered="false" type="info" size="small">
              {{ ch.language || "--" }}
            </n-tag>
          </n-space>
        </template>
        <n-text depth="3">
          {{ ch.description || "--" }}
        </n-text>
      </n-thing>
      <template #suffix>
        <router-link :to="`/challenge-description/${ch.id}`">
          <n-button type="success">
            {{ $t("form.view") }}
            <n-icon size="22" style="margin-left: 10px">
              <arrow-right />
            </n-icon>
          </n-button>
        </router-link>
      </template>
    </n-list-item>
  </n-list>

  <!-- pagination -->
  <n-space justify="center" style="padding: 1rem">
    <n-pagination
      :disabled="challenge.loading"
      size="large"
      v-model:page="page"
      :page-count="Math.floor(challenge.getTotalChallenges / limit) + 1"
      :prev="prev"
      :next="next"
    />
  </n-space>
</template>
