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
  NH2,
  NP,
} from 'naive-ui';
import { ALL_LANGS } from '../../../helpers/constants';
import { useChallengeStore } from '../../../stores/challenges';
import { useUserStore } from '../../../stores/user';
import { useRouter } from 'vue-router';

const user = useUserStore();

const router = useRouter();

const formRef = ref(null);
const challenge = useChallengeStore();

const model = ref({
  question: 'The element to collect and validate data?',
  description: 'If you want to apply required rule for.',
  duration: 10,
  answers: ['1', '2', '3', '4', '5'],
});

onMounted(() => {
  if (!user.isLoggedIn) router.push('/auth');
});
</script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="Add New Challenge">
        <n-form ref="formRef" :model="model" label-placement="top">
          <n-space vertical style="margin-bottom: 2rem">
            <n-text depth="3"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit?</n-text
            >
          </n-space>
          <!--  -->
          <n-grid :span="24" :x-gap="24">
            <!--  -->
            <n-form-item-gi :span="12" label="Question" path="question">
              <n-input v-model:value="model.question" placeholder="Question" />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi :span="12" label="Description" path="description">
              <n-input
                v-model:value="model.description"
                placeholder="Description"
              />
            </n-form-item-gi>
            <!--  -->
            <n-form-item-gi
              :span="12"
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
              :span="12"
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
              :span="12"
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
              :span="12"
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
              :span="12"
              label="Insert the answer here"
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
            <n-form-item-gi :span="12" label="Insert the code here" path="code">
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
            <n-form-item-gi :span="24" label="Code" path="liveCode">
              <n-space style="overflow: auto" class="code-container">
                <n-code
                  class="code"
                  :code="model.code"
                  :language="model.language"
                />
              </n-space>
            </n-form-item-gi>
            <!--  -->
            <n-gi :span="24">
              <n-button
                :disabled="challenge.loading"
                :loading="challenge.loading"
                type="primary"
                strong
                @click="challenge.postNewChallenge(model)"
              >
                Add new Challenge
              </n-button>
            </n-gi>
            <!--  -->
          </n-grid>
          <!--  -->
        </n-form>
      </n-card></n-layout
    ></n-space
  >
</template>
