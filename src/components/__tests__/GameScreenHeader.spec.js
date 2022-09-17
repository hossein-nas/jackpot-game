import GameScreenHeader from "@/components/GameScreenHeader.vue";
import { shallowMount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { computed, ref } from "vue";

const localCredit = ref(10);

vi.mock("@/components/composables/useJackpot", () => {
  return {
    default: () => ({
      credit: computed(() => localCredit.value),
    }),
  };
});

describe("GameScreenHeader.vue", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be loading state when "rolling" prop is true', async () => {
    const wrapper = shallowMount(GameScreenHeader, {
      props: {
        rolling: true,
      },
    });

    expect(wrapper.find("svg").exists()).toBe(true);

    await wrapper.setProps({
      rolling: false,
    });

    expect(wrapper.find("button[vitest-re-roll-button] svg").exists()).toBe(
      false
    );
    expect(wrapper.find("button[vitest-re-roll-button] span").exists()).toBe(
      true
    );
  });

  it("should indicate remaining credit on screen", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = shallowMount(GameScreenHeader, {
      props: {
        rolling: true,
      },
    });

    expect(wrapper.find("p[vitest-remaining-credit-text]").text()).toContain(
      "10"
    );

    localCredit.value = 9;

    await vi.runAllTicks();

    expect(wrapper.find("p[vitest-remaining-credit-text]").text()).toContain(
      "9"
    );
  });

  it('should emit "re-roll" while button is clicked', async () => {
    const wrapper = shallowMount(GameScreenHeader, {
      props: { rolling: false },
    });

    await wrapper.find("button[vitest-re-roll-button] span").trigger("click");

    expect(wrapper.emitted("re-roll")[0]).toEqual([true]);
  });
});
