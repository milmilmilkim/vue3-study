<template>
  <h1>환율</h1>
  <p>국민은행 매매 기준</p>
  <hr />
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <hr />
    <form @change="changeMoney">
      <input name="money" type="radio" value="JPY" checked="true" />엔(JPY)
      <input name="money" type="radio" value="USD" /> 달러(USD)
      <input name="money" type="radio" value="THB" /> 밧(THB)
    </form>
    {{ exchange() }}

    <hr />
    <input v-model="inputMoney" type="number" @change="changeInputMoney" /> ({{ moneyText }})
    <input v-model="KRW" type="text" disabled /> ({{ MoneyText.KRW }})
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const isLoading = ref<boolean>(false);

enum Money {
  JPY,
  KRW,
  THB,
  USD,
}

enum MoneyText {
  JPY = '엔',
  KRW = '원',
  THB = '밧',
  USD = '달러',
}

//이렇게까지 해야하나?

const KRW = ref<number>(0);
const money = ref<Money>(Money.JPY);
const moneyText = ref<MoneyText>(MoneyText.JPY);
const inputMoney = ref<number>(100); //기본값 100엔

const key = Money[money.value];

let exchangeData: any = null;

const changeInputMoney = () => {
  setKRW();
};

const changeMoney = (e: any) => {
  money.value = Money[e.target.value as keyof typeof Money];
  moneyText.value = MoneyText[e.target.value as keyof typeof MoneyText];
  setKRW();
};

const exchange = () => {
  return exchangeData ? exchangeData[key] : 0;
};

const setKRW = () => {
  let result;

  switch (money.value) {
    case Money.JPY:
      result = (inputMoney.value / 100) * exchangeData[Money[Money.JPY]];
      break;

    default:
      result = (inputMoney.value / 100) * exchangeData[key];
      break;
  }

  KRW.value = result;
};
onMounted(async () => {
  exchangeData = JSON.parse(window.sessionStorage.getItem('exchangeData') as string);

  if (exchangeData) {
    setKRW();

    return;
  }
  try {
    isLoading.value = true;
    const { data } = await axios.get('http://localhost:3001/exchange');
    console.log(data);
    exchangeData = data;
    window.sessionStorage.setItem('exchangeData', JSON.stringify(exchangeData));
    setKRW();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
});
</script>
