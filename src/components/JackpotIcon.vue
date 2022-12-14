<template>
  <div class="JackpotIcon">
    <transition name="move-up" duration="300" mode="out-in">
      <JackpotLoading v-if="localLoading" :loading="localLoading" />
      <component
        :is="'jackpot-' + activeIcon"
        class="w-[5rem] h-[5rem]"
        v-else
      />
    </transition>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  Transition,
  watch,
} from "vue";
import useJackpot from "./composables/useJackpot";
import JackpotCherry from "./JackpotCherry.vue";
import JackpotLemon from "./JackpotLemon.vue";
import JackpotLoading from "./JackpotLoading.vue";
import JackpotOrange from "./JackpotOrange.vue";
import JackpotWatermelon from "./JackpotWatermelon.vue";

export default defineComponent({
  name: "JackpotIcon",

  components: {
    JackpotCherry,
    JackpotLemon,
    JackpotWatermelon,
    JackpotOrange,
    Transition,
    JackpotLoading,
  },

  props: {
    icon: {
      type: String,
      required: true,
    },

    loading: {
      type: Boolean,
      default: true,
    },

    delay: {
      type: Number,
      default: 1000,
    },
  },

  emits: {
    revealed: (v) => true,
  },

  setup(props, { emit }) {
    const { IconMapper } = useJackpot();
    const localLoading = ref(true);

    const activeIcon = computed(() => {
      return IconMapper[props.icon];
    });

    onMounted(() => {});

    const onShouldAppear = () => {
      setTimeout(() => {
        localLoading.value = false;

        emit("revealed", true);
      }, props.delay);
    };

    const onShouldReset = () => {
      localLoading.value = true;
    };

    watch(
      () => props.loading,
      (value) => {
        if (value === false) {
          onShouldAppear();
        } else {
          onShouldReset();
        }
      },
      {
        immediate: true,
      }
    );

    return {
      localLoading,
      activeIcon,
    };
  },
});
</script>
