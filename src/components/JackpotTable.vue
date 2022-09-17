<template>
  <table class="JackpotTable">
    <tbody>
      <tr>
        <td class="border border-gray-200 p-4">
          <JackpotIcon :icon="rollResult[0]" :delay="1000" :loading="loading" />
        </td>
        <td class="border border-gray-200 p-4">
          <JackpotIcon :icon="rollResult[1]" :delay="2000" :loading="loading" />
        </td>
        <td class="border border-gray-200 p-4">
          <JackpotIcon
            :icon="rollResult[2]"
            :delay="3000"
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
import useJackpot from "./composables/useJackpot";
import JackpotIcon from "./JackpotIcon.vue";

export default defineComponent({
  name: "JackpotTable",

  components: { JackpotIcon },

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
    const { rollResult } = useJackpot();
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
      rollResult,
      onDone,
    };
  },
});
</script>
