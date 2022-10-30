<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import SignIn from './SignIn.vue';
import SignUp from './SignUp.vue';

const count = ref(0);
const user = useUserStore();
const router = useRouter();

watch(user, (newValue) => {
  if (newValue.isLoggedIn) router.push('/challenges');
});
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="Authentication" style="min-height: 90vh">
        <!--  -->
        <n-space justify="center">
          <n-tabs
            class="card-tabs"
            default-value="auth"
            animated
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
          >
            <n-tab-pane name="auth" tab="Sign in">
              <sign-in></sign-in>
            </n-tab-pane>
            <n-tab-pane name="signup" tab="Sign up">
              <sign-up></sign-up>
            </n-tab-pane>
          </n-tabs>
        </n-space>

        <!--  -->
      </n-card>
    </n-layout>
  </n-space>
</template>
