<script setup></script>

<template>
  <n-space vertical>
    <n-layout>
      <n-card :title="$t('home.title')">
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
          <n-h3>{{ $t("home.definition") }}</n-h3>

          <n-text depth="2">
            {{ $t("home.description2") }}
          </n-text>

          <n-divider dashed />

          <router-link to="/challenges">
            <n-button type="success">{{
              $t("form.see")
            }}</n-button></router-link
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
