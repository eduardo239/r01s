<script setup>
import { h, ref, watch, onMounted } from 'vue';
import { NSpace, NCard, NLayout, NDataTable, NButton, NText } from 'naive-ui';
import { useChallengeStore } from '../../../stores/challenges';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';

const user = useUserStore();
const challenge = useChallengeStore();

const router = useRouter();

const pagination = ref(true);

// onMounted(() => {
//   challenge._getAllChallenges();
// });

// watch(challenge, () => {});

const createColumns = ({ view, remove, update }) => {
  return [
    {
      title: 'ID',
      key: 'id',
      render(row) {
        return h(
          NText,
          {
            round: true,
            type: 'default',
            style: 'font-size: .75rem',
            onClick: () => null,
          },
          {
            default: () => {
              const q = row.id;
              if (q.length > 10) return q.slice(0, 10) + ' ...';
              else return q;
            },
          }
        );
      },
    },
    {
      title: 'Language',
      key: 'language',
      render(row) {
        return h(
          NText,
          {
            type: 'info',
            style: 'font-size: .75rem',
            onClick: () => null,
          },
          { default: () => row.language }
        );
      },
    },
    {
      title: 'Alternatives',
      key: 'answers.length',
      render(row) {
        return h(
          NText,
          {
            type: 'info',
            style: 'font-size: .75rem',
            onClick: () => null,
          },
          { default: () => row.answers.length }
        );
      },
    },
    {
      title: 'View',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            type: 'success',
            size: 'tiny',
            secondary: true,
            onClick: () => view(row),
          },
          { default: () => 'View' }
        );
      },
    },
    {
      title: 'Update',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            type: 'info',
            size: 'tiny',
            secondary: true,
            onClick: () => update(row),
          },
          { default: () => 'Update' }
        );
      },
    },
    {
      title: 'Remove',
      key: 'remove',
      render(row) {
        return h(
          NButton,
          {
            strong: true,
            tertiary: false,
            type: 'error',
            size: 'tiny',
            secondary: true,
            onClick: () => remove(row),
          },
          { default: () => 'Remover' }
        );
      },
    },
  ];
};

const columns = createColumns({
  view(row) {
    router.push(`/challenge-description/${row.id}`);
  },
  remove(row) {
    challenge._deleteChallengeById(row.id);
  },
  update(row) {
    return null;
  },
});
</script>

<template>
  <n-space vertical v-if="user.isLoggedIn">
    <n-layout>
      <n-card title="User Profile">
        <n-data-table
          :columns="columns"
          :data="challenge.challenges"
          :pagination="pagination"
          :bordered="false"
        />
      </n-card>
    </n-layout>
  </n-space>

  <!-- not logged in -->
  <n-space vertical v-else>
    <n-layout>
      <n-card title="You must have permission to access this page"> </n-card>
    </n-layout>
  </n-space>
</template>
