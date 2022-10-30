<script setup>
import { onMounted, ref } from 'vue';
import { NButton, NList, NThing, NListItem, NTag } from 'naive-ui';
import { useChallengeStore } from '../../stores/challenges';

const challenge = useChallengeStore();

onMounted(() => {
  challenge.getAllChallenges();
});
</script>

<template>
  <n-list
    hoverable
    clickable
    v-for="ch in challenge.challenges"
    :key="ch.id"
    style="margin-bottom: 0.5rem"
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
        <n-button type="success">View More</n-button>
      </template>
    </n-list-item>
  </n-list>
</template>
