<template>
  <div class="h-full w-full flex items-center justify-center">
    <button
      type="button"
      @click="onClick"
      class="bg-slate-500 text-white hover:bg-slate-600 border-slate-700 rounded px-4 py-2"
    >
      Start Game
    </button>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "StartScreen",

  props: {},

  emits: {
    started: (v) => true,
  },
  setup(props, { emit }) {
    const onClick = () => {
      emit("started", true);
    };
    return {
      onClick,
    };
  },
});
</script>
