import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommonStore = defineStore('common', () => {
  const count = ref<number>(0);
  const name = ref<string>('sori');
  const setName = (newName: string): void => {
    console.log(newName);
    name.value = newName;
  };


  return { count, name, setName };
});
