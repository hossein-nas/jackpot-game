<template>
  <div class="GameScreenFooter flex items-center justify-center">
    <button
      ref="button"
      v-if="credit > 0"
      vitest-cashout-button
      type="button"
      @mouseenter="onMouseEnter"
      @click="onClick"
      class="bg-red-500 text-white hover:bg-red-600 border-slate-700 rounded px-4 py-2 uppercase"
    >
      Cash out
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useJackpot from "./composables/useJackpot";

const DIRECTION = {
  0: "right",
  1: "bottom",
  2: "left",
  3: "top",
};

export default defineComponent({
  name: "GameScreenFooter",

  props: {},

  setup(props) {
    const button = ref();

    const {
      credit,
      doesCashOutButtonGotCrazy,
      checkCashOutButtonCondition,
      isCashOutButtonWorking,
    } = useJackpot();

    checkCashOutButtonCondition();

    const onClick = () => {
      if (!isCashOutButtonWorking.value) {
        alert("CASHOUT button is not working ...");
        return;
      }

      alert("Money transferred to your account.");
    };

    const onMouseEnter = () => {
      if (doesCashOutButtonGotCrazy()) {
        const direction = DIRECTION[Math.floor(Math.random() * 4)];
        if (direction === "right") {
          button.value.style = "transform: translateX(300px)";
        } else if (direction === "bottom") {
          button.value.style = "transform: translateY(300px)";
        } else if (direction === "left") {
          button.value.style = "transform: translateX-(300px)";
        } else if (direction === "top") {
          button.value.style = "transform: translateY(-300px)";
        }
      }
    };

    return {
      credit,
      button,
      onClick,
      onMouseEnter,
    };
  },
});
</script>
