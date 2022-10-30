<script setup>
import { ref } from 'vue';
import { NSpace, NLayout, NCard, NGrid, NGridItem } from 'naive-ui';

const count = ref(0);
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="User Profile">
        <n-grid :span="24" :x-gap="24">
          <n-grid-item :span="6">menu</n-grid-item>
          <n-grid-item :span="18">info</n-grid-item>
        </n-grid>
      </n-card>
    </n-layout>
  </n-space>
</template>
