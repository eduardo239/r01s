<script setup>
import { computed, onMounted, ref } from "vue";
import { useUserStore } from "../../stores/user";
import { NSpace, NList, NListItem, NStatistic } from "naive-ui";
import { useChallengeStore } from "../../stores/challenges";

const user = useUserStore();
const challenge = useChallengeStore();

const handleColorPercentage = computed(() => {
  const result = parseInt(user.percentageCorrect);
  if (result <= 20) return "text-error";
  else if (result <= 60) return "text-warning";
  else return "text-success";
});

onMounted(() => {});
</script>

<template>
  <n-space vertical class="stats-container">
    <n-list>
      <n-list-item class="p-1">
        <n-statistic
          :label="$t('user.stats.totalChallenges')"
          :value="challenge.getTotalChallenges"
        >
        </n-statistic>
      </n-list-item>
      <n-list-item>
        <n-statistic
          :label="$t('user.stats.completedChallenges')"
          :value="user.sumOfAllCompletedChallenges(user.userLocalStorage)"
        >
        </n-statistic>
      </n-list-item>
      <n-list-item>
        <n-statistic
          :label="$t('user.stats.correctChallenges')"
          :value="user.totalOfCorrectAnswers(user.userLocalStorage)"
        >
        </n-statistic
      ></n-list-item>

      <n-list-item>
        <n-statistic
          :class="handleColorPercentage"
          :label="$t('user.stats.percentageCorrectChallenges')"
          :value="user.percentageOfCorrectAnswers(user.userLocalStorage)"
        >
        </n-statistic>
      </n-list-item>

      <n-list-item>
        <n-statistic
          :label="$t('user.stats.totalPoints')"
          :value="user.totalOfPoints(user.userLocalStorage)"
        >
        </n-statistic>
      </n-list-item>
    </n-list>
  </n-space>
</template>
