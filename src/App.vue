<template>
  <div class="h-screen w-screen bg-gray-100">
    <template v-if="!isStarted">
      <StartScreen @started="onStart" />
    </template>
    <template v-else>
      <GameScreen />
    </template>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import useJackpot from "./components/composables/useJackpot";
import GameScreen from "./components/GameScreen.vue";
import StartScreen from "./components/StartScreen.vue";

export default defineComponent({
  name: "App",

  props: {},

  components: {
    StartScreen,
    GameScreen,
  },

  setup(props) {
    const { reRoll, canReRoll } = useJackpot();

    const isStarted = ref(false);

    const onStart = () => {
      reRoll();
      isStarted.value = true;
    };

    return {
      isStarted,
      onStart,
    };
  },
});
</script>

<style>
.move-up-enter-active,
.move-up-leave-active {
  transition: all 0.1s ease-out;
  transform: scale(1);
  opacity: 1;
}

.move-up-enter-from,
.move-up-leave-to {
  transition: all 0.1s ease-out;
  transform: scale(2);
  opacity: 0.2;
}
</style>
