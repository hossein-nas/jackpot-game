import { shallowMount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";

import useJackpot from "@/components/composables/useJackpot";
import GameScreen from "@/components/GameScreen.vue";
import GameScreenBody from "@/components/GameScreenBody.vue";
import GameScreenFooter from "@/components/GameScreenFooter.vue";
import GameScreenHeader from "@/components/GameScreenHeader.vue";
import JackpotIcon from "@/components/JackpotIcon.vue";
import JackpotTable from "@/components/JackpotTable.vue";

describe("GameScreen.vue", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be on "rolling" state by default', () => {
    const wrapper = shallowMount(GameScreen);

    expect(wrapper.vm.rolling).toBe(true);
  });

  it('should not emit "rolling-done" before 3000 ms', async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mountWrapper();

    await vi.runAllTimers();
    vi.advanceTimersByTime(2999);

    expect(
      wrapper.findComponent(GameScreenBody).emitted("rolling-done")
    ).toEqual(undefined);
  });

  it('should emit "rolling-done" after 3000 ms', async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mountWrapper();

    await vi.runAllTimers();
    vi.advanceTimersByTime(3000);

    expect(
      wrapper.findComponent(GameScreenBody).emitted("rolling-done")[0]
    ).toEqual([true]);
  });

  it('should set "rolling" to false after 3000ms', async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mountWrapper();

    expect(wrapper.vm.rolling).toBe(true);

    await vi.runAllTimers();
    vi.advanceTimersByTime(3000);

    expect(wrapper.vm.rolling).toBe(false);
  });

  it("should call onReRoll function on pressing reRoll button", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mountWrapper();

    const spy = vi.spyOn(wrapper.vm, "onReRoll");

    await vi.runAllTimers();
    await vi.advanceTimersByTime(3000);

    expect(spy).toHaveBeenCalledTimes(0);

    // Clicking re-roll button
    const reRollButtonEl = wrapper.find("button[vitest-re-roll-button]");
    expect(reRollButtonEl.isVisible()).toBe(true);

    await reRollButtonEl.trigger("click");

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("The GameScreen should be visible when is not rolling", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = await mountWrapper();

    expect(wrapper.findComponent(GameScreenFooter).exists()).toBe(false);

    wrapper.vm.rolling = false;

    await vi.runAllTicks();

    expect(wrapper.findComponent(GameScreenFooter).exists()).toBe(true);
  });
});

function mountWrapper() {
  const { reRoll } = useJackpot();
  reRoll();

  return shallowMount(GameScreen, {
    global: {
      stubs: {
        GameScreenBody,
        GameScreenFooter,
        GameScreenHeader,
        JackpotTable,
        JackpotIcon,
      },
    },
  });
}
