<template>
  <img
    :class="['w-[5rem] h-[5rem]', classes]"
    src="@/assets/images/jackpot.png"
    alt="jackpot"
  />
</template>

<script>
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "JackpotLoading",

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const classes = computed(() => {
      if (props.loading) {
        return "animate-spin";
      }

      return "";
    });
    return { classes };
  },
});
</script>
