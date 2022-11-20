<script setup>
import { ref } from "vue";
import { NSpace, NRadioGroup, NRadio, NButton } from "naive-ui";
import { useRouter } from "vue-router";
import { Send as SendAlt } from "@vicons/carbon";

const router = useRouter();
const checked = ref(null);
const isDisabled = ref(false);
const model = ref({ alternative: "" });

const props = defineProps(["alternatives", "isPlaying"]);
const emits = defineEmits(["event"]);

const handleChange = (e) => (checked.value = e.target.value);

const submit = (data) => {
  isDisabled.value = true;
  emits("event", model);
};
</script>

<template>
  <n-space vertical style="margin: 1rem 0">
    <n-radio-group
      v-for="(alternative, i) in alternatives"
      :key="i"
      :disabled="!isPlaying"
      v-model:value="model.alternative"
      class="challenge-alternatives"
    >
      <n-radio
        class="challenge-alternative"
        :checked="checked === alternative"
        :value="alternative"
        name="form-alternatives"
        @change="handleChange"
      >
        {{ alternative }}
      </n-radio>
    </n-radio-group>

    <n-button-group
      style="display: flex; justify-content: space-between; margin-top: 1rem"
    >
      <n-button
        size="large"
        :disabled="isDisabled || !isPlaying"
        type="primary"
        @click="submit(model)"
      >
        {{ $t("form.save") }}
        <n-icon size="22" style="margin-left: 10px">
          <send-alt />
        </n-icon>
      </n-button>

      <n-button :disabled="isPlaying" size="large" @click="() => router.go(-1)">
        {{ $t("form.back") }}
      </n-button>
    </n-button-group>
  </n-space>
</template>
