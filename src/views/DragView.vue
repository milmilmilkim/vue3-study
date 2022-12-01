<template>
  <h1>Vue-draggable</h1>
  <p>투두리스트</p>
  <hr />
  <form @submit.prevent="addTodo">
    <input type="text" v-model="newTodo" />
    <button>add</button>
  </form>

  <div class="count">{{ checkedTodoCount() }} / {{ myArray.length }}</div>
  <draggable v-model="myArray" :group="{ name: 'myGroup' }" item-key="idx" @change="changeTodo">
    <template #item="{ element }">
      <div class="todo-item">
        <input type="checkbox" v-model="element.isCheck" @change="changeTodo" />
        <span v-if="element.isEdit"
          ><input @keydown.enter.prevent="() => editTodo(element)" type="text" v-model="element.do"
        /></span>
        <span v-else :class="element.isCheck ? 'checked' : ''">{{ element.do }}</span>
        <div class="right-button">
          <span @click="() => editTodo(element)">{{ element.isEdit ? '완료' : '수정' }}</span> |
          <span @click="() => deleteTodo(element)">삭제</span>
        </div>
      </div>
    </template>
  </draggable>

  <hr />
  <h2>list2</h2>

  <draggable
    v-model="myArray2"
    :group="{ name: 'myGroup', put: true }"
    item-key="idx"
    @change="changeTodo"
  >
    <template #item="{ element }">
      <div class="todo-item">
        <input type="checkbox" v-model="element.isCheck" />
        <span v-if="element.isEdit"
          ><input @keydown.enter.prevent="() => editTodo(element)" type="text" v-model="element.do"
        /></span>
        <span v-else :class="element.isCheck ? 'checked' : ''">{{ element.do }}</span>
        <div class="right-button">
          <span @click="() => editTodo(element)">{{ element.isEdit ? '완료' : '수정' }}</span> |
          <span @click="() => deleteTodo(element)">삭제</span>
        </div>
      </div>
    </template>
  </draggable>
  <!-- <ul>
    <li v-for="item in myArray" :key="item.idx">{{ JSON.stringify(item) }}</li>
  </ul> -->
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
import { ref, onUnmounted } from 'vue';

type Todo = {
  idx: number;
  isCheck: boolean;
  do: string;
  isEdit?: boolean;
};

const newTodo = ref<string>('');

const todoList: Todo[] = JSON.parse(window.localStorage.getItem('todoList') as string);
const todoList2: Todo[] = JSON.parse(window.localStorage.getItem('todoList2') as string);

const myArray = ref<Todo[]>(todoList || []);
const myArray2 = ref<Todo[]>(todoList2 || []);

// const toggleCheckBox = (element: Todo) => {
//   element.isCheck = !element.isCheck;
// };

onUnmounted(() => {
  window.localStorage.setItem('todoList', JSON.stringify(myArray.value));
  window.localStorage.setItem('todoList2', JSON.stringify(myArray2.value));
});
const addTodo = () => {
  myArray.value.push({
    idx: myArray.value.length + myArray2.value.length + 1,
    isCheck: false,
    do: newTodo.value,
  } as Todo);
  window.localStorage.setItem('todoList', JSON.stringify(myArray.value));
  newTodo.value = '';
};

// computed
const checkedTodoCount = () => {
  return myArray.value.filter((item: Todo) => item.isCheck === true).length;
};

// method
const deleteTodo = (element: Todo) => {
  myArray.value = myArray.value.filter((item: Todo) => item.idx !== element.idx);
  window.localStorage.setItem('todoList', JSON.stringify(myArray.value));
};

const editTodo = (element: Todo) => {
  element.isEdit = element.isEdit ? !element.isEdit : true;
};

const changeTodo = () => {
  window.localStorage.setItem('todoList', JSON.stringify(myArray.value));
  window.localStorage.setItem('todoList2', JSON.stringify(myArray2.value));
};
</script>

<style lang="scss">
.count {
  margin: 20px;
}
.todo-item {
  padding: 20px;
  width: 300px;
  border: 1px solid #e6e6e6;
  border-bottom: 2px solid #4070c2;
  border-radius: 5px;
  background-color: #fff;
  margin: 20px 0;
  cursor: pointer;
  display: flex;

  .right-button {
    display: inline-block;
    margin-left: auto;

    span {
      cursor: pointer;
    }
  }
}

span.checked {
  text-decoration: line-through;
}
</style>
