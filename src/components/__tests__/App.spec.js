import App from "@/App.vue";
import useJackpot from "@/components/composables/useJackpot";
import GameScreen from "@/components/GameScreen.vue";
import StartScreen from "@/components/StartScreen.vue";
import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("App.vue", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("should render StartGame at first glance", () => {
    const wrapper = mount(App);

    expect(wrapper.findComponent(StartScreen).exists()).toBe(true);
  });

  it("should move to GameScreen after clicking start button", async () => {
    const wrapper = mount(App);

    await wrapper.findComponent(StartScreen).find("button").trigger("click");

    expect(wrapper.findComponent(GameScreen).exists()).toBe(true);
  });

  it("should have 10 credit on start", async () => {
    const wrapper = mount(App);
    const { credit } = useJackpot();

    expect(credit.value).toBe(10);
  });

  it("should be decrease after reroll", async () => {
    vi.useFakeTimers({
      toFake: ["setTimeout"],
    });

    const wrapper = mount(App);
    const { credit } = useJackpot();

    expect(credit.value).toBe(10);

    await wrapper.findComponent(StartScreen).find("button").trigger("click");

    await vi.runAllTimers();
    await vi.advanceTimersByTime(2000);

    expect(credit.value).toBe(10);

    await vi.advanceTimersByTime(1000);

    expect(credit.value).toEqual(9);

    vi.useRealTimers();
  });
});
