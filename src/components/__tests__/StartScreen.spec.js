import { describe, it, expect } from "vitest";
import StartScreen from "@/components/StartScreen.vue";
import { mount } from "@vue/test-utils";

describe("StartScreen.vue", () => {
  it("should has a button with Start Game text", () => {
    const wrapper = mount(StartScreen);

    expect(wrapper.text()).toBe("Start Game");
  });

  it('should emit "started" when clicking on button', () => {
    const wrapper = mount(StartScreen);

    wrapper.find("button").trigger("click");

    expect(wrapper.emitted().started[0]).toEqual([true]);
  });
});
