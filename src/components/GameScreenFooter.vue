<template>
  <div class="GameScreenFooter flex items-center justify-center">
    <button
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

export default defineComponent({
  name: "GameScreenFooter",

  props: {},

  setup(props, {}) {
    return {};
  },
});
</script>
