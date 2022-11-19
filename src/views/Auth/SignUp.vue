<script setup>
import { ref } from "vue";
import { useUserStore } from "../../stores/user";
import { NForm, NInput, NFormItemRow, NButton, NSwitch, NText } from "naive-ui";
import AlertMessage from "../../components/ui/AlertMessage.vue";

const model = ref({
  email: "my_email3@email.com",
  password: "123123",
  username: "secret_user",
  terms: true,
});
const formRef = ref(null);
const user = useUserStore();
</script>

<template>
  <n-form
    class="form-container"
    ref="formRef"
    :model="model"
    size="medium"
    style="min-width: 300px"
  >
    <n-form-item-row label="Email">
      <n-input v-model:value="model.email" placeholder="Email" />
    </n-form-item-row>

    <n-form-item-row label="Password">
      <n-input
        v-model:value="model.password"
        type="password"
        placeholder="****"
        show-password-on="click"
      />
    </n-form-item-row>

    <n-form-item-row :label="$t('form.username')">
      <n-input v-model:value="model.username" placeholder="Username" />
    </n-form-item-row>

    <n-form-item-row :label="$t('form.terms')">
      <n-switch
        size="small"
        v-model:value="model.terms"
        style="padding: 0 1rem 0 0"
      />
      <n-text depth="3" style="font-size: 0.7rem"
        >{{ $t("auth.terms") }}
      </n-text>
    </n-form-item-row>

    <n-button
      :disabled="user.loading"
      :loading="user.loading"
      type="primary"
      block
      secondary
      strong
      @click="user.signUpFirebase(model)"
    >
      {{ $t("form.signup") }}
    </n-button>
  </n-form>

  <alert-message v-if="user.error.status" :message="user.error" />
</template>
