<template>
  <div class="GameScreen h-full w-full">
    <GameScreenHeader @re-roll="onReRoll" :rolling="rolling" />
    <GameScreenBody :rolling="rolling" @rolling-done="onRollingDone" />
    <GameScreenFooter />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import GameScreenHeader from "./GameScreenHeader.vue";
import GameScreenBody from "./GameScreenBody.vue";
import GameScreenFooter from "./GameScreenFooter.vue";

export default defineComponent({
  name: "GameScreen",
  props: {},
  setup(props, {}) {
    const rolling = ref(true);

    const onRollingDone = () => {
      rolling.value = false;
    };

    const onReRoll = () => {
      rolling.value = true;
    };

    return {
      rolling,
      onRollingDone,
      onReRoll,
    };
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
