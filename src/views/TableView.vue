<template>
  <h1>table</h1>

  <input type="date" v-model="startDate" /> ~ <input type="date" v-model="endDate" />
  <button @click="setDateList">날짜 설정</button>

  <div class="tableWrapper">
    <table>
      <thead>
        <tr>
          <th v-for="item in dateList">{{ item.date }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="item in dateList">
            <div class="container">
              <textarea type="text" class="myInput" v-model="item.memo"></textarea>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="save">저장</button>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');
const startDate = ref<string>(dayjs(new Date()).format('YYYY-MM-DD'));
const endDate = ref<string>(dayjs(new Date()).add(1, 'day').format('YYYY-MM-DD'));
const gap = ref<number>(dayjs(endDate.value).diff(dayjs(startDate.value), 'day'));
// const warningText = ref<string>('');
const dateList = ref<dateInfo[]>(
  JSON.parse(window.localStorage.getItem('schedule') as string) || []
);

type dateInfo = {
  idx: number;
  date: string;
  memo?: string;
};

const setDateList = () => {
  gap.value = dayjs(endDate.value).diff(dayjs(startDate.value), 'day');

  dateList.value = [];
  for (let i = 0; i < gap.value + 1; i++) {
    dateList.value.push({
      idx: i,
      date: dayjs(startDate.value).add(i, 'day').format('MM-DD ddd'),
    });
  }
};

const save = () => {
  window.localStorage.setItem('schedule', JSON.stringify(dateList.value));
};
</script>

<style>
.tableWrapper {
  overflow: auto;
}
table {
  border: 1px solid #000;
}

td {
  border: 1px solid #000;
}

.myInput {
  resize: none;
  border: none;
}
.container {
  display: flex;
}
</style>
