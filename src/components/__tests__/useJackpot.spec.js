import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
let useJackpot;

describe("useJackpot.js", async () => {
  beforeEach(async () => {
    await vi.resetModules();

    useJackpot = (await import("@/components/composables/useJackpot")).default;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("should have 10 credit by default at first", async () => {
    const { credit } = useJackpot();

    expect(credit.value).toBe(10);
  });

  it("should decrease by 1 after rolling for first time", async () => {
    const { credit, reRoll, done } = useJackpot();

    expect(credit.value).toBe(10);
    reRoll(), done();

    expect(credit.value).toBe(9);
  });

  it("should populate rollResult variable after reRolling", async () => {
    vi.resetModules("@/components/composables/useJackpot");

    const { credit, reRoll, done, rollResult } = useJackpot();

    expect(rollResult.value).toBeUndefined();

    reRoll(), done();

    expect(rollResult.value).not.toBeUndefined();
    expect(rollResult.value[0]).toSatisfy(isKindOfFruit);
  });
});

const isKindOfFruit = (value) => {
  return ["c", "l", "o", "w"].includes(value);
};
