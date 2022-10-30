<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { NSpace, NList, NListItem, NStatistic } from 'naive-ui';

const user = useUserStore();

const handleColorPercentage = computed(() => {
  const result = parseInt(100);
  if (result <= 20) return 'text-error';
  else if (result <= 60) return 'text-warning';
  else return 'text-success';
});

onMounted(() => {});
</script>

<template>
  <n-space vertical class="form-container">
    <n-list>
      <n-list-item class="p-1">
        <n-statistic label="Number of Site Challenges" :value="1000">
        </n-statistic>
      </n-list-item>
      <n-list-item>
        <n-statistic label="Completed Challenges" :value="100"> </n-statistic>
      </n-list-item>
      <n-list-item>
        <n-statistic label="Correct Challenges" :value="3"> </n-statistic
      ></n-list-item>
      <n-list-item>
        <n-statistic
          :class="handleColorPercentage"
          label="Percentage of Correct Challenges"
          value="50%"
        >
        </n-statistic>
      </n-list-item>
    </n-list>
  </n-space>
</template>
