<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../stores/user";
import { useChallengeStore } from "../../stores/challenges";
import ChallengeHeader from "../../components/challenge/ChallengeHeader.vue";
import ChallengeCode from "../../components/challenge/ChallengeCode.vue";
import ChallengeForm from "../../components/challenge/ChallengeForm.vue";
import AlertMessage from "../../components/ui/AlertMessage.vue";
import { Timer as TheTimer } from "@vicons/carbon";

const challenge = useChallengeStore();
const user = useUserStore();

const route = useRoute();
const router = useRouter();

const isPlaying = ref(true);
const timer = ref(10);

const message = ref({ type: "", message: "" });

const countDownTimer = () => {
  if (timer.value > 0 && challenge.challenge && isPlaying.value) {
    setTimeout(() => {
      timer.value--;
      countDownTimer();
    }, 1000);
  } else if (timer.value <= 0) {
    isPlaying.value = false;
    timer.value = 0;

    message.value = {
      type: "error",
      message: `The time is over.`,
    };
  }
};

watch(challenge, (newValue) => {
  if (newValue) {
    // timer
    // timer.value = challenge.challenge.duration;
  }
});

onMounted(() => {
  if (route.params) {
    challenge._getChallengeById(route.params.cid);
  }
  // verifica se o usuario esta logado
  if (!user.isLoggedIn) router.push("/auth");

  timer.value = challenge.challenge.duration;

  countDownTimer();
});

onUnmounted(() => {
  challenge.resetChallenge();
});

const saveUserAnswer = (data) => {
  isPlaying.value = false;

  const userAnswer = data.value;
  const timeLeft = timer.value;
  const correct = userAnswer.alternative === challenge.challenge.correct;

  const payload = {
    uid: user.user.uid,
    cid: challenge.challenge.id,
    correct,
    points: correct ? (timeLeft - 1) * challenge.challenge.difficulty : 0,
  };

  message.value = {
    type: payload.correct ? "success" : "error",
    message: payload.correct
      ? `Congratulations, you got the answer right. You got ${payload.points} points.`
      : `Sorry but the answer is incorrect. You got 0 points`,
  };

  user.saveUserAnswer(payload);
};
</script>

<template>
  <div class="timer">
    <n-icon size="22" style="margin-left: 10px">
      <the-timer />
    </n-icon>
    {{ $t("challenges.timer") }} - {{ timer }} {{ $t("challenges.seconds") }}
  </div>
  <n-space vertical>
    <n-card :title="challenge.challenge.question" v-if="challenge.challenge">
      <challenge-header
        :id="challenge.challenge.id"
        :question="challenge.challenge.question"
        :difficulty="challenge.challenge.difficulty"
        :timer="timer"
      ></challenge-header>

      <challenge-code
        :language="challenge.challenge.language"
        :code="challenge.challenge.code"
      ></challenge-code>
      <challenge-form
        @event.once="saveUserAnswer"
        :alternatives="challenge.challenge.answers"
        :isPlaying="isPlaying"
      >
      </challenge-form>

      <alert-message v-if="message.message" :message="message" />
    </n-card>

    <!-- not found -->
    <n-card title="Challenge not found!" v-else></n-card>
  </n-space>
</template>
