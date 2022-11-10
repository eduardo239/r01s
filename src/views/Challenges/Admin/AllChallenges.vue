<script setup>
import { h, ref, watch, onMounted } from 'vue';
import {
  NSpace,
  NCard,
  NLayout,
  NDataTable,
  NButton,
  NText,
  NIcon,
} from 'naive-ui';
import { useChallengeStore } from '../../../stores/challenges';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';
import { TrashCan, UpdateNow, View as ViewNow } from '@vicons/carbon';

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
              if (q.length > 5) return q.slice(0, 5) + ' ...';
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
      title: 'View',
      key: 'actions',
      render(row) {
        return h(
          NIcon,
          {
            component: ViewNow,
            size: 18,
            onClick: () => view(row),
          },
          { default: () => null }
        );
      },
    },
    {
      title: 'Update',
      key: 'actions',
      render(row) {
        return h(
          NIcon,
          {
            component: UpdateNow,
            size: 18,
            onClick: () => update(row),
          },
          { default: () => null }
        );
      },
    },
    {
      title: 'Delete',
      key: 'remove',
      render(row) {
        return h(
          NIcon,
          {
            component: TrashCan,
            size: 18,
            onClick: () => remove(row),
          },
          { default: () => null }
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
