<script setup></script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card title="Think Fast App">
        <n-space vertical>
          Este é um aplicativo, que desafia o usuário a responder uma questão
          sobre algoritmo, com um tempo limite
        </n-space>
        <n-space style="padding: 1rem 0">
          <n-carousel autoplay dot-type="line" :interval="10000" show-arrow>
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
            />
            <img
              class="carousel-img"
              src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
            />
          </n-carousel>
        </n-space>

        <n-space style="padding: 1rem 0" vertical>
          <n-h3>Definition of 'challenge'</n-h3>

          <n-text depth="2"
            >A challenge is something new and difficult which requires great
            effort and determination.
          </n-text>

          <n-divider dashed />

          <n-text depth="2" strong
            >Synonyms: dare, provocation, summons to contest, wero</n-text
          >

          <n-divider dashed />

          <router-link to="/challenges">
            <n-button type="success">See the challenges</n-button></router-link
          >
        </n-space>
      </n-card>
    </n-layout>
  </n-space>
</template>

<style scoped>
.carousel-img {
  width: 100%;
  height: 440px;
  object-fit: cover;
}
</style>
