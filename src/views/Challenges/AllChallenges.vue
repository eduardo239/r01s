<script setup>
import { computed, onMounted, ref } from 'vue';
import { NButton, NList, NThing, NListItem, NTag, NPagination } from 'naive-ui';
import { useChallengeStore } from '../../stores/challenges';

const challenge = useChallengeStore();

const page = ref(1);
const limit = ref(3);

onMounted(() => {
  challenge.getAllChallenges();

  // pagination
  // const _pagination = { page: page.value, _limit: limit.value };
  // challenge.getAllPaginationChallenges(_pagination);
});
</script>

<template>
  <n-list
    bordered
    v-for="ch in challenge.challenges"
    :key="ch.id"
    style="margin-bottom: 0.25rem"
  >
    <n-list-item>
      <n-thing :title="ch.question">
        <template #description>
          <n-space size="small" style="margin-top: 4px">
            <n-tag :bordered="false" type="info" size="small">
              {{ ch.duration || '--' }}s
            </n-tag>

            <n-tag :bordered="false" type="info" size="small">
              {{ ch.language || '--' }}
            </n-tag>
          </n-space>
        </template>
        {{ ch.description || '--' }}
      </n-thing>
      <template #suffix>
        <router-link :to="`/challenge-description/${ch.id}`">
          <n-button type="success">View More</n-button>
        </router-link>
      </template>
    </n-list-item>
  </n-list>

  <!-- pagination -->
  <!-- <n-space justify="center" style="padding: 1rem">
    <n-pagination
      size="large"
      v-model:page="page"
      :page-count="totalPages"
      :prev="prev"
      :next="next"
    />
  </n-space> -->
</template>
