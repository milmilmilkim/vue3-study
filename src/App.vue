<template>
  <div class="content">
    <nav>
      <router-link v-for="item in menu" :to="item.path" :key="item.name">
        {{ item.name }}
      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

type Menu = {
  name: string;
  path: string;
};

const menu = ref<Menu[]>([
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Pinia',
    path: '/pinia',
  },
  {
    name: 'Exchange',
    path: '/exchange',
  },
  {
    name: 'Table',
    path: '/table',
  },
  {
    name: 'Tetris',
    path: '/tetris',
  },
  {
    name: 'Canvas',
    path: '/canvas',
  },
]);
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: #000;
}
nav a::after {
  content: '|';
  width: 10px;
  margin: 10px;
  text-decoration: none;
  color: #e4e4e4;
}

.content {
  padding: 20px;
  width: 1024px;
  margin: auto;
  border: 1px solid #eee;
}
</style>
