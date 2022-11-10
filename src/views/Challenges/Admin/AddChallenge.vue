<script setup>
import { onMounted, ref } from 'vue';
import {
  NButton,
  NForm,
  NFormItemGi,
  NGi,
  NInput,
  NDynamicInput,
  NInputNumber,
} from 'naive-ui';
import { ALL_LANGS } from '../../../helpers/constants';
import { useChallengeStore } from '../../../stores/challenges';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';
import AlertMessage from '../../../components/ui/AlertMessage.vue';

const user = useUserStore();

const router = useRouter();

const formRef = ref(null);
const challenge = useChallengeStore();

const model = ref({
  question: null,
  description: null,
  duration: 50,
  answers: ['1', '2', '3'],
  difficulty: null,
  code: 'const x = 1;',
  correct: null,
});

const rules = ref({
  question: {
    required: true,
    trigger: ['blur'],
    message: 'Please input the question',
  },
  description: {
    required: true,
    trigger: ['blur'],
    message: 'Please input the description',
  },
  language: {
    required: true,
    trigger: ['blur'],
    message: 'Please input the language',
  },
  correct: {
    required: true,
    trigger: ['blur'],
    message: 'Please input the correct answer',
  },
  code: {
    required: true,
    trigger: ['blur'],
    message: 'Please input the code',
  },
});

onMounted(() => {});
</script>

<template>
  <n-space vertical v-if="user.isLoggedIn">
    <n-layout>
      <n-card title="Add New Challenge">
        <n-form
          class="form-admin"
          ref="formRef"
          :model="model"
          label-placement="top"
          :rules="rules"
        >
          <n-space vertical style="margin-bottom: 2rem">
            <n-text type="warning">
              Fill in the data to create a new challenge</n-text
            >
          </n-space>
          <!--  -->
          <n-grid cols="2" item-responsive :x-gap="24">
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              :cols="1"
              label="Question"
              path="question"
            >
              <n-input
                v-model:value="model.question"
                placeholder="Challenge question."
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="Description"
              path="description"
            >
              <n-input
                v-model:value="model.description"
                placeholder="What is the input type of the algorithm."
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="Select the language"
              path="language"
            >
              <n-select
                v-model:value="model.language"
                placeholder="Select the Language"
                :options="
                  ALL_LANGS.map((v) => ({
                    label: v.name,
                    value: v.name,
                  }))
                "
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="Select the difficulty (min=1, max=10)"
              path="difficulty"
            >
              <n-input-number
                :default-value="1"
                :min="1"
                :max="10"
                style="width: 100%"
                v-model:value="model.difficulty"
                clearable
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="How long will the challenge last"
              path="duration"
            >
              <n-space :min="10" :max="100" vertical style="width: 100%">
                <n-slider v-model:value="model.duration" :step="1" />

                <n-input-number
                  :default-value="10"
                  :min="10"
                  :max="100"
                  v-model:value="model.duration"
                />
              </n-space>
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="Select the right answer"
              path="correct"
            >
              <n-select
                v-model:value="model.correct"
                placeholder="Select the Language"
                :options="
                  model.answers.map((v) => ({
                    label: v,
                    value: v,
                  }))
                "
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="Add the alternatives here"
              path="answers"
            >
              <n-dynamic-input
                v-model:value="model.answers"
                placeholder="Please type here"
                :min="3"
                :max="5"
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              span="2 600:1"
              label="Insert the code here"
              path="code"
            >
              <n-input
                v-model:value="model.code"
                placeholder="Insert the code here ....."
                type="textarea"
                :autosize="{
                  minRows: 4,
                  maxRows: 20,
                }"
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi span="2" label="Code Live Preview" path="liveCode">
              <n-space
                style="overflow: auto; width: 100%"
                class="code-container"
                s
              >
                <n-code
                  class="code"
                  :code="model.code"
                  :language="model.language"
                />
              </n-space>
            </n-form-item-gi>
            <!--  -->
            <n-gi span="2">
              <n-button
                :disabled="challenge.loading"
                :loading="challenge.loading"
                type="primary"
                strong
                @click="challenge._postNewChallenge(model)"
              >
                Add new Challenge
              </n-button>
            </n-gi>
            <!--  -->
          </n-grid>
          <!--  -->
        </n-form>

        <alert-message
          v-if="challenge.error.status"
          :message="challenge.error"
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
