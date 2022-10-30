<script setup>
import { onMounted, ref, watch } from 'vue';
import {
  NForm,
  NInput,
  NFormItemRow,
  NButton,
  NUploadDragger,
  NUpload,
  NP,
  NText,
} from 'naive-ui';
import { useUserStore } from '../../stores/user';
import axios from 'axios';

const user = useUserStore();

const formRef = ref(null);
const model = ref({ email: '', displayName: '', photoURL: '' });

function loadUserValues() {
  model.value.username = user.user.displayName;
  model.value.email = user.user.email;
  model.value.photoURL = user.user.photoURL;
}

function submit(data) {
  model.value.photoURL = data.file;
}

async function test() {
  const key = '1c59d4cb82d9d04c2ea9c168fd6e3650';
  const url = `https://api.imgbb.com/1/upload?key=${key}`;
  const headers = { 'Content-Type': 'multipart/form-data' };

  // await axios.post(url, formData, headers);
}
watch(user, () => {
  // prevenir o refresh
  if (user.isLoggedIn) loadUserValues();
});

onMounted(() => {
  // prevenir a mudanca de rota
  if (user.isLoggedIn) loadUserValues();
});
</script>

<template>
  <n-form class="form-container" ref="formRef" :model="model" size="medium">
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

    <n-form-item-row label="Username">
      <n-input v-model:value="model.username" placeholder="Username" />
    </n-form-item-row>

    <n-form-item-row>
      <n-upload directory-dnd :on-change="submit" :max="1">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 32 32"
              >
                <path
                  d="M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20z"
                  fill="currentColor"
                ></path>
              </svg>
            </n-icon>
          </div>
          <n-text class="small-text sans-text" strong>
            Click or drag a file to this area to upload
          </n-text>
          <n-p depth="3" class="small-text sans-text">
            Strictly prohibit from uploading sensitive information.
          </n-p>
        </n-upload-dragger>
      </n-upload>
    </n-form-item-row>

    <n-button
      :disabled="user.loading"
      :loading="user.loading"
      type="primary"
      block
      secondary
      strong
      @click="test(model)"
    >
      Update
    </n-button>
  </n-form>
</template>
