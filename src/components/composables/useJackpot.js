import { computed, ref } from "vue";

const credit = ref(10);

const isRolling = ref(false);

const rollResult = ref();

const IconMapper = {
  c: "cherry",
  w: "watermelon",
  o: "orange",
  l: "lemon",
};

const IconCreditMapper = {
  c: 10,
  w: 20,
  o: 30,
  l: 40,
};

const IconMapperArray = ["c", "l", "o", "w"];

export default function () {
  return {
    credit: computed(() => credit.value),
    rollResult: computed(() => rollResult.value),
    canReRoll: computed(() => credit.value > 0),
    IconMapper,
    reRoll,
    done,
  };
}

function roll(twistPercentage = 0) {
  const res = [];
  for (let i = 0; i < 3; i++) {
    res[i] = getRandomFruit();
  }
  if (allIsSame(res) && twistPercentage) {
    const newResult = rollWithCheat(twistPercentage, res);

    return newResult;
  }

  return res;
}

function rollWithCheat(twistPercentage, prevRoll) {
  debugger;
  const rand = Math.random();

  if (rand > twistPercentage / 100) return prevRoll;

  return roll();
}

function reRoll() {
  rollResult.value = [];

  if (credit.value < 40) {
    rollResult.value = roll();
  }

  if (credit.value >= 40 && credit.value < 60) {
    rollResult.value = roll(30);
  }

  if (credit.value >= 60) {
    rollResult.value = roll(60);
  }

  return rollResult.value;
}

function getRandomFruit() {
  const rand = Math.floor(Math.random() * 4);
  return IconMapperArray[rand];
}

function allIsSame(arr) {
  if (arr && arr.length == 3) {
    return arr[0] === arr[1] && arr[0] === arr[2];
  }

  return false;
}

function increaseCredit(resultArr) {
  const fruit = resultArr[0];
  const creditValue = IconCreditMapper[fruit];
  credit.value += creditValue;
}

function decreaseCredit(resultArr) {
  credit.value -= 1;
}

function done() {
  if (allIsSame(rollResult.value)) {
    debugger;
    increaseCredit(rollResult.value);
  } else {
    decreaseCredit();
  }
}
