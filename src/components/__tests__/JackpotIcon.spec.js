import { afterEach, describe, expect, it, vi } from "vitest";

import JackpotIcon from "@/components/JackpotIcon.vue";
import JackpotLoading from "@/components/JackpotLoading.vue";
import JackpotCherry from "@/components/JackpotCherry.vue";
import { mount } from "@vue/test-utils";

describe("JackpotIcon.vue", () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("should display JackpotLoading icon when loading props is true", async () => {
    const wrapper = mount(JackpotIcon, {
      global: {
        components: {
          JackpotLoading,
        },
      },
      props: {
        icon: "no-set",
        loading: true,
      },
    });

    expect(wrapper.findComponent(JackpotLoading).exists()).toBe(true);
  });

  it("should display JackpotIcon icon after setting loading props to false with given delay", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mount(JackpotIcon, {
      global: {
        components: {
          JackpotLoading,
          JackpotCherry,
        },
      },
      props: {
        icon: "c",
        loading: false,
        delay: 2000,
      },
    });

    await vi.advanceTimersByTime(1000);

    expect(wrapper.findComponent(JackpotLoading).exists()).toBe(true);
    expect(wrapper.findComponent(JackpotCherry).exists()).toBe(false);

    await vi.advanceTimersByTime(1000);

    expect(wrapper.findComponent(JackpotLoading).exists()).toBe(false);
    expect(wrapper.findComponent(JackpotCherry).exists()).toBe(true);
  });

  it('should emit "revealed" after given delay', async () => {
    const delay = 3333;
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mount(JackpotIcon, {
      global: {
        components: {
          JackpotLoading,
          JackpotCherry,
        },
      },
      props: {
        icon: "c",
        loading: false,
        delay,
      },
    });

    await vi.advanceTimersByTime(1000);

    expect(wrapper.emitted("revealed")).toEqual(undefined);

    await vi.advanceTimersByTime(delay - 1000);

    expect(wrapper.emitted("revealed")[0]).toEqual([true]);
  });
});
