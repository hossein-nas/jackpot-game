<template>
  <div class="flex flex-col items-center justify-center">
    <div class="GameScreenHeader flex items-center justify-center">
      <button
        type="button"
        vitest-re-roll-button
        @click="onClick"
        :disabled="rolling"
        :class="[
          'flex justify-center items-center rounded px-4 py-2',
          {
            'bg-slate-500 text-white hover:bg-slate-600 border-slate-700':
              !rolling,
            'bg-gray-400 cursor-wait': rolling,
          },
        ]"
      >
        <svg
          v-if="rolling"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span v-else> Start Again </span>
      </button>
    </div>
    <p class="text-center" vitest-remaining-credit-text>
      Your credit is : <b>{{ credit }} </b>
    </p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useJackpot from "./composables/useJackpot";

export default defineComponent({
  name: "GameScreenHeader",

  props: {
    rolling: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    "re-roll": (v) => true,
  },

  setup(props, { emit }) {
    const { credit, rollResult } = useJackpot();
    const onClick = () => {
      emit("re-roll", true);
    };

    return {
      credit,
      rollResult,
      onClick,
    };
  },
});
</script>
