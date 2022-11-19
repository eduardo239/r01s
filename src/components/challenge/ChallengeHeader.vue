<script setup>
import { defineProps } from "vue";
import { NSpace, NText } from "naive-ui";

const props = defineProps([
  "id",
  "question",
  "difficulty",
  "language",
  "timer",
]);
</script>

<template>
  <n-space style="padding: 2rem 0">
    <n-text depth="3">ID # {{ id }}</n-text>
    <n-text type="warning"
      >{{ $t("challenges.difficulty") }} # {{ difficulty ?? 0 }}</n-text
    >
    <n-text type="error"
      >{{ $t("challenges.timer") }} # {{ timer ? timer : 0 }}
      {{ $t("challenges.seconds") }}</n-text
    >
  </n-space>
</template>
