<template>
  <div class="GameScreenBody flex items-center justify-center">
    <JackpotTable @done="onDone" :rolling="rolling" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import JackpotTable from "./JackpotTable.vue";

export default defineComponent({
  name: "GameScreenBody",

  components: { JackpotTable },

  props: {
    rolling: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    "rolling-done": (v) => true,
  },

  setup(props, { emit }) {
    const onDone = () => {
      emit("rolling-done", true);
    };

    return {
      onDone,
    };
  },
});
</script>
