<template>
  <div class="GameScreen h-full w-full">
    <GameScreenHeader @re-roll="onReRoll" :rolling="rolling" />
    <GameScreenBody :rolling="rolling" @rolling-done="onRollingDone" />
    <GameScreenFooter v-if="!rolling" />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useJackpot from "./composables/useJackpot";
import GameScreenBody from "./GameScreenBody.vue";
import GameScreenFooter from "./GameScreenFooter.vue";
import GameScreenHeader from "./GameScreenHeader.vue";

export default defineComponent({
  name: "GameScreen",
  props: {},
  setup(props, {}) {
    const { reRoll, canReRoll, done } = useJackpot();

    const rolling = ref(true);

    const onRollingDone = () => {
      rolling.value = false;
      done();
    };

    const onReRoll = () => {
      if (canReRoll.value) {
        reRoll();
        rolling.value = true;
      } else {
        alert("Sorry, You can not start game. your credit is over.");
      }
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
