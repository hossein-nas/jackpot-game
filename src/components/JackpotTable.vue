<template>
  <table class="JackpotTable">
    <tbody>
      <tr>
        <td class="border border-gray-200 p-4">
          <JackpotIcon icon="c" delay="1000" :loading="loading" />
        </td>
        <td class="border border-gray-200 p-4">
          <JackpotIcon icon="w" delay="2000" :loading="loading" />
        </td>
        <td class="border border-gray-200 p-4">
          <JackpotIcon
            icon="l"
            delay="3000"
            :loading="loading"
            @revealed="onDone"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent, watch, ref } from "vue";
import JackpotIcon from "./JackpotIcon.vue";

export default defineComponent({
  name: "JackpotTable",

  props: {
    rolling: {
      type: Boolean,
      required: true,
    },
  },

  emits: {
    done: (v) => true,
  },

  setup(props, { emit }) {
    const loading = ref(true);

    const onDone = () => {
      emit("done", true);
    };

    watch(
      () => props.rolling,
      (value) => {
        if (value) {
          loading.value = true;
          setTimeout(() => (loading.value = false), 500);
        }
      },
      {
        immediate: true,
      }
    );

    return {
      loading,
      onDone,
    };
  },
  components: { JackpotIcon },
});
</script>
