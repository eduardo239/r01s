<script setup>
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { NSpace, NList, NListItem, NStatistic } from 'naive-ui';
import { useChallengeStore } from '../../stores/challenges';

const user = useUserStore();
const challenge = useChallengeStore();

const handleColorPercentage = computed(() => {
  const result = parseInt(user.percentageCorrect);
  if (result <= 20) return 'text-error';
  else if (result <= 60) return 'text-warning';
  else return 'text-success';
});

onMounted(() => {
  user.correctAnswers;
  user.getTotalCorrectAnswers;
});
</script>

<template>
  <n-space vertical class="form-container">
    <n-list>
      <n-list-item class="p-1">
        <n-statistic
          label="Number of Site Challenges"
          :value="challenge.getTotalChallenges"
        >
        </n-statistic>
      </n-list-item>
      <n-list-item>
        <n-statistic
          label="Completed Challenges"
          :value="user.totalUserCompletedChallenges"
        >
        </n-statistic>
      </n-list-item>
      <n-list-item>
        <n-statistic label="Correct Challenges" :value="user.correctAnswers">
        </n-statistic
      ></n-list-item>

      <n-list-item>
        <n-statistic
          :class="handleColorPercentage"
          label="Percentage of Correct Challenges"
          :value="user.percentageCorrect"
        >
        </n-statistic>
      </n-list-item>

      <n-list-item>
        <n-statistic label="Total of Points" :value="user.totalUserPoints">
        </n-statistic>
      </n-list-item>
    </n-list>
  </n-space>
</template>
