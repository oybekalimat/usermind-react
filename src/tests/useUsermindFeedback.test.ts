/* eslint-disable no-global-assign */

import { renderHook } from "@testing-library/react";
import { useUsermindFeedback } from "../useUsermindFeedback";

const testScriptSrc = "http://localhost:3000/test.js";

describe("useUsermindFeedback", () => {
  it("should return nothing if window is not defined", () => {
    const originalWindow = window;
    window = undefined as any;

    const { result } = renderHook(() => useUsermindFeedback(testScriptSrc));

    expect(result.current).toBeUndefined();
    window = originalWindow;
  });

  it("should return nothing if scriptSrc is not defined and log an error to the console 'Usermind script src is not defined'", () => {
    const originalConsole = console;
    console = { error: jest.fn() } as any;

    const { result } = renderHook(() => useUsermindFeedback(undefined as any));

    expect(console.error).toHaveBeenCalledWith(
      "Usermind script src is not defined"
    );

    expect(result.current).toBeUndefined();
    console = originalConsole;
  });

  it("should return nothing if window.__usermind_script_injected is true", () => {
    const originalWindow = window;
    window = { __usermind_script_injected: true } as any;

    const { result } = renderHook(() => useUsermindFeedback(testScriptSrc));

    expect(result.current).toBeUndefined();
    window = originalWindow;
  });

  it("should set window.__usermind_script_injected to true", () => {
    const originalWindow = window;
    window = { __usermind_script_injected: false } as any;

    renderHook(() => useUsermindFeedback(testScriptSrc));

    expect(window.__usermind_script_injected).toBe(true);
    window = originalWindow;
  });

  it("should create a script element with the correct src and append it to the body", () => {
    renderHook(() => useUsermindFeedback(testScriptSrc));

    const script = document.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.src).toBe(testScriptSrc);
    expect(script?.async).toBe(true);
  });
});
