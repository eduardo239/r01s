<script setup>
import { ref, computed } from 'vue';
import { NAlert } from 'naive-ui';
import { useUserStore } from '../../stores/user';

const user = useUserStore();

const props = defineProps(['message']);

const capitalizeFirstLetter = computed(() => {
  return (
    props.message.type.charAt(0).toUpperCase() + props.message.type.slice(1)
  );
});
</script>

<template>
  <n-alert
    :title="capitalizeFirstLetter"
    :type="message.type"
    :on-close="user.resetError"
    closable
  >
    {{ message.message }}
  </n-alert>
</template>
