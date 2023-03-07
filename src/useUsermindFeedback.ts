import { useEffect } from "react";

export function useUsermindFeedback(scriptSrc: string) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!scriptSrc) {
      console.error("Usermind script src is not defined");
      return;
    }

    if (window.__usermind_script_injected) {
      return;
    }

    window.__usermind_script_injected = true;

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;

    document.body.appendChild(script);

    function onScriptError() {
      script.remove();
    }

    script.addEventListener("error", onScriptError);

    return () => {
      if (script) {
        script.removeEventListener("error", onScriptError);
      }
    };
  }, [scriptSrc]);
}
