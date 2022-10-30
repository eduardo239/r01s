<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useChallengeStore } from '../../stores/challenges';
import ChallengeHeader from '../../components/challenge/ChallengeHeader.vue';
import ChallengeCode from '../../components/challenge/ChallengeCode.vue';
import ChallengeForm from '../../components/challenge/ChallengeForm.vue';
import AlertMessage from '../../components/ui/AlertMessage.vue';

const challenge = useChallengeStore();
const route = useRoute();

const isPlaying = ref(true);
const cid = ref(null);
const timer = ref(1000);

const countDowntimer = () => {
  if (timer.value > 0 && challenge.challenge && isPlaying.value) {
    setTimeout(() => {
      timer.value--;
      countDowntimer();
    }, 100);
  } else if (timer.value <= 0) {
    isPlaying.value = false;
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
    cid.value = route.params.cid;
    challenge.getChallengeById(cid.value);
  }
});

const saveUserAnswer = (data) => {
  const userAnswer = data.value;
  isPlaying.value = false;
  // constoi o model
  // this.isPlaying = false;
  // if (this.user) {
  // const uid = this.user.getUser.uid;
  // const cid = this.$route.params.challengeId;
  // const correct = data.alternative === this.course.course.correct;
  // const answer = data.alternative;
  // const difficulty = this.course.course.difficulty || 1;
  // const duration = this.duration;
  // const points = correct ? duration * difficulty : 0;
  // const data = { uid, cid, correct, answer, points, difficulty, duration };
  // this.user.postNewAnswer(data);
  // }
};
</script>

<template>
  <n-space vertical>
    <n-card :title="challenge.challenge.question" v-if="challenge.challenge">
      <!-- header -->
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

      <alert-message />
    </n-card>

    <!-- not found -->
    <n-card title="Challenge not found!" v-else></n-card>
  </n-space>
</template>
