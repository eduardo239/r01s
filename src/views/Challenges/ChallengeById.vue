<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { useChallengeStore } from '../../stores/challenges';
import ChallengeHeader from '../../components/challenge/ChallengeHeader.vue';
import ChallengeCode from '../../components/challenge/ChallengeCode.vue';
import ChallengeForm from '../../components/challenge/ChallengeForm.vue';
import AlertMessage from '../../components/ui/AlertMessage.vue';

const challenge = useChallengeStore();
const user = useUserStore();

const route = useRoute();
const router = useRouter();

const isPlaying = ref(true);
const timer = ref(1000);

const message = ref({ type: '', message: '' });

const countDowntimer = () => {
  if (timer.value > 0 && challenge.challenge && isPlaying.value) {
    setTimeout(() => {
      timer.value--;
      countDowntimer();
    }, 100);
  } else if (timer.value <= 0) {
    isPlaying.value = false;
    timer.value = 0;
  }
};

watch(challenge, (newValue) => {
  if (newValue) {
    // timer
    timer.value = challenge.challenge.duration * 10;
    countDowntimer();
  }
});

onMounted(() => {
  if (route.params) {
    challenge._getChallengeById(route.params.cid);
  }
  // verifica se o usuario esta logado
  if (!user.isLoggedIn) router.push('/auth');
});

onUnmounted(() => {
  challenge.resetChallenge();
});

const saveUserAnswer = (data) => {
  const userAnswer = data.value;
  isPlaying.value = false;
  const timeLeft = timer.value;
  const correct = userAnswer.alternative === challenge.challenge.correct;
  console.log(userAnswer.alternative + '===' + challenge.challenge.correct);
  const payload = {
    uid: user.user.uid,
    cid: challenge.challenge.id,
    correct,
    points: correct ? timeLeft * challenge.challenge.difficulty : 0,
  };

  message.value = {
    type: payload.correct ? 'success' : 'error',
    message: payload.correct
      ? `Congratulations, you got the answer right. You got ${payload.points} points.`
      : `Sorry but the answer is incorrect. You got 0 points`,
  };

  user.saveUserAnswer(payload);
};
</script>

<template>
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
