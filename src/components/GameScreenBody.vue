<template>
  <div class="GameScreenBody flex items-center justify-center">
    <JackpotTable />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import JackpotTable from "./JackpotTable.vue";

export default defineComponent({
  name: "GameScreenBody",
  props: {},
  setup(props, {}) {
    return {};
  },
  components: { JackpotTable },
});
</script>
