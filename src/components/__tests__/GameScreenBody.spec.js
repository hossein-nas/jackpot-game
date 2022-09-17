import GameScreenBody from "@/components/GameScreenBody.vue";
import JackpotTable from "@/components/JackpotTable.vue";
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import useJackpot from "../composables/useJackpot";

describe("GameScreenBody.vue", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('should emit "rolling-done" when "JackpotTable" done transition', async () => {
    vi.useFakeTimers({
      toTake: ["setTimeout"],
    });

    const { reRoll } = useJackpot();
    reRoll();

    const wrapper = mount(GameScreenBody, {
      props: {
        rolling: true,
      },
    });

    await vi.runAllTimers();
    await vi.advanceTimersByTime(3000);

    expect(wrapper.findComponent(JackpotTable).emitted("done")[0]).toEqual([
      true,
    ]);
  });

  it('should not emit "rolling-done" when "JackpotTable" before finishing transition', async () => {
    vi.useFakeTimers({
      toTake: ["setTimeout"],
    });

    const { reRoll } = useJackpot();
    reRoll();

    const wrapper = mount(GameScreenBody, {
      props: {
        rolling: true,
      },
    });

    await vi.runAllTimers();
    await vi.advanceTimersByTime(2999);

    expect(wrapper.findComponent(JackpotTable).emitted("done")).toEqual(
      undefined
    );
  });
});
