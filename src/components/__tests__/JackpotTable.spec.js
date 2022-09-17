import JackpotLoading from "@/components/JackpotLoading.vue";
import JackpotTable from "@/components/JackpotTable.vue";
import JackpotIcon from "@/components/JackpotIcon.vue";
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useJackpot from "../composables/useJackpot";

describe("JackpotTable.vue", () => {
  beforeEach(() => {
    useJackpot().reRoll();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should have loading spinner when is rolling", async () => {
    const wrapper = mount(JackpotTable, {
      global: {
        components: {
          JackpotLoading,
          JackpotIcon,
        },
      },
      props: {
        rolling: true,
      },
    });

    expect(wrapper.findAllComponents(JackpotLoading).length).toBe(3);
  });

  it("should have not loading spinner after rolling done", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mount(JackpotTable, {
      global: {
        components: {
          JackpotLoading,
          JackpotIcon,
        },
      },
      props: {
        rolling: true,
      },
    });

    const { rollResult, IconMapper } = useJackpot();

    await vi.advanceTimersByTime(3000);
    await vi.runAllTimers();

    expect(wrapper.findAllComponents(JackpotLoading).length).toBe(0);

    rollResult.value.forEach((item, index) => {
      expect(wrapper.findAll("img")[index].attributes("alt")).toBe(
        IconMapper[rollResult.value[index]]
      );
    });
  });

  it("should set loading to false after starting to roll", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mount(JackpotTable, {
      props: {
        rolling: true,
      },
    });

    expect(wrapper.vm.loading).toBe(true);

    await vi.advanceTimersToNextTimer();

    expect(wrapper.vm.loading).toBe(false);
  });

  it('should emit "done" after 3000ms (when rolling done)', async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mount(JackpotTable, {
      props: {
        rolling: true,
      },
    });

    expect(wrapper.emitted("done")).toBe(undefined);

    await vi.advanceTimersByTime(3000);
    await vi.runAllTimers();

    expect(wrapper.emitted("done")[0]).toEqual([true]);
  });
});
