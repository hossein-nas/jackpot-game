<template>
  <table class="JackpotTable">
    <tbody>
      <tr>
        <td class="border border-gray-200 p-4">
          <JackpotIcon icon="c" delay="1000" :loading="false" />
        </td>
        <td class="border border-gray-200 p-4">
          <JackpotIcon icon="w" delay="2000" :loading="false" />
        </td>
        <td class="border border-gray-200 p-4">
          <JackpotIcon icon="l" delay="3000" :loading="false" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from "vue";
import JackpotLoading from "./JackpotLoading.vue";
import JackpotIcon from "./JackpotIcon.vue";

export default defineComponent({
  name: "JackpotTable",
  props: {},
  setup(props, {}) {
    return {};
  },
  components: { JackpotLoading, JackpotIcon },
});
</script>
