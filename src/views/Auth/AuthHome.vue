<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

const count = ref(0);
const user = useUserStore();
const router = useRouter();

watch(user, (newValue) => {
  if (newValue.isLoggedIn) router.push("/challenges");
});
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="Authentication" style="min-height: 90vh">
        <!--  -->
        <n-space justify="center">
          <n-tabs default-value="sign-in" animated>
            <n-tab-pane name="sign-in" :tab="$t('auth.signin')">
              <sign-in></sign-in>
            </n-tab-pane>
            <n-tab-pane name="signup" :tab="$t('auth.signup')">
              <sign-up></sign-up>
            </n-tab-pane>
          </n-tabs>
        </n-space>

        <!--  -->
      </n-card>
    </n-layout>
  </n-space>
</template>
