<template>
  <div class="GameScreen h-full w-full">
    <GameScreenHeader />
    <GameScreenBody />
    <GameScreenFooter />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import GameScreenHeader from "./GameScreenHeader.vue";
import GameScreenBody from "./GameScreenBody.vue";
import GameScreenFooter from "./GameScreenFooter.vue";

export default defineComponent({
  name: "GameScreen",
  props: {},
  setup(props, {}) {
    return {};
  },
  components: { GameScreenHeader, GameScreenBody, GameScreenFooter },
});
</script>

<style scoped lang="scss">
.GameScreen {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 10rem 1fr 5rem;
}
</style>
