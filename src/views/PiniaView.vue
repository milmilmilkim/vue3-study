<template>
  <h1>Pinia</h1>
  <hr />
  {{ count }}
  {{ name }}
  <p>pinia+vue3+setup function</p>
  <button @click="plus">+</button>
  <button @click="minus">-</button>
  <button @click="reset">reset</button>

  <form @submit.prevent="changeName">
    <input type="text" placeholder="text" v-model="newName" />
  </form>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const commonStore = useCommonStore();
const { setName } = commonStore;
const { name, count } = storeToRefs(commonStore);

const newName = ref<string>('');

const changeName = () => {
  setName(newName.value);
};

const plus = () => {
  count.value++;
};

const reset = () => {
  count.value = 0;
};

const minus = () => {
  count.value--;
};
</script>
