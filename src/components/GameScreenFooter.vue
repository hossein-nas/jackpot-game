<template>
  <div class="GameScreenFooter flex items-center justify-center">
    <button
      v-if="credit > 0"
      type="button"
      @click="onClick"
      class="bg-red-500 text-white hover:bg-red-600 border-slate-700 rounded px-4 py-2 uppercase"
    >
      Cash out
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import useJackpot from "./composables/useJackpot";

export default defineComponent({
  name: "GameScreenFooter",

  props: {},

  setup(props, {}) {
    const { credit } = useJackpot();
    return {
      credit,
    };
  },
});
</script>
