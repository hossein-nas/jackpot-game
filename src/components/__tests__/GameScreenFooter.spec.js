import { mount, shallowMount } from "@vue/test-utils";
import { afterEach, describe, expect, it, test, vi } from "vitest";
import useJackpot from "@/components/composables/useJackpot";
import GameScreenFooter from "@/components/GameScreenFooter.vue";
import { computed } from "vue";
vi.mock("@/components/composables/useJackpot");

describe("GameScreenFooter.vue", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be visible only when credit is above 0", async () => {
    vi.resetAllMocks();
    useJackpot.mockReturnValue({
      credit: 0,
      doesCashOutButtonGotCrazy: false,
      checkCashOutButtonCondition: () => false,
      isCashOutButtonWorking: false,
    });

    const wrapper = mount(GameScreenFooter);

    expect(wrapper.find("button[vitest-cashout-button]").exists()).toBe(false);
  });

  it("should move on mouse hover by chance of 50 percent", async () => {
    vi.resetAllMocks();
    useJackpot.mockReturnValue({
      credit: 10,
      doesCashOutButtonGotCrazy: () => true,
      checkCashOutButtonCondition: vi.fn(),
    });

    const wrapper = mount(GameScreenFooter);

    await wrapper.find("button[vitest-cashout-button]").trigger("mouseenter");

    expect(wrapper.find("button[vitest-cashout-button]").exists()).toBe(true);
    expect(
      wrapper.find("button[vitest-cashout-button]").attributes("style")
    ).toEqual(expect.stringContaining("transform: translate"));
  });

  it("should not move on mouse hover by chance of 50 percent", async () => {
    vi.resetAllMocks();
    useJackpot.mockReturnValue({
      credit: 10,
      doesCashOutButtonGotCrazy: () => false,
      checkCashOutButtonCondition: vi.fn(),
    });

    const wrapper = mount(GameScreenFooter);

    await wrapper.find("button[vitest-cashout-button]").trigger("mouseenter");

    expect(wrapper.find("button[vitest-cashout-button]").exists()).toBe(true);
    expect(
      wrapper.find("button[vitest-cashout-button]").attributes("style")
    ).not.toEqual(expect.stringContaining("transform: translate"));
  });

  test('"checkCashOutButtonCondition" hook should be call before mount', async () => {
    vi.resetAllMocks();
    const mock = vi.fn();
    useJackpot.mockReturnValue({
      credit: 10,
      doesCashOutButtonGotCrazy: () => false,
      checkCashOutButtonCondition: mock,
    });

    const wrapper = shallowMount(GameScreenFooter);

    expect(mock).toHaveBeenCalledOnce();
  });

  it("should NOT working when user clicks on CASHOUT button by chance of 50 percent", async () => {
    vi.resetAllMocks();
    const mock = vi.fn();
    alert = mock;
    useJackpot.mockReturnValue({
      credit: 10,
      doesCashOutButtonGotCrazy: () => false,
      checkCashOutButtonCondition: vi.fn,
      isCashOutButtonWorking: computed(() => false),
    });

    const wrapper = shallowMount(GameScreenFooter);

    await wrapper.find("button[vitest-cashout-button]").trigger("click");

    expect(alert).toHaveBeenCalledWith("CASHOUT button is not working ...");
  });

  it("should NOT working when user clicks on CASHOUT button by chance of 50 percent", async () => {
    vi.resetAllMocks();
    const mock = vi.fn();
    alert = mock;
    useJackpot.mockReturnValue({
      credit: 10,
      doesCashOutButtonGotCrazy: () => false,
      checkCashOutButtonCondition: vi.fn,
      isCashOutButtonWorking: computed(() => true),
    });

    const wrapper = shallowMount(GameScreenFooter);

    await wrapper.find("button[vitest-cashout-button]").trigger("click");

    expect(alert).toHaveBeenCalledWith("Money transferred to your account.");
  });
});
