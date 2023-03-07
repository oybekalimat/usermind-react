import React from "react";
import { render } from "@testing-library/react";
import { UsermindFeedback } from "../UsermindFeedback";

describe("UsermindFeedback", () => {
  it("should render correctly", () => {
    const { container } = render(
      <UsermindFeedback projectId="123">
        <button>Click here</button>
      </UsermindFeedback>,
      { container: document.body }
    );

    const element = container.querySelector("button");
    const triggerAttribute = element?.getAttribute("data-usermind-trigger");
    const projectId = element?.getAttribute("data-project-id");

    expect(triggerAttribute).toBe("true");
    expect(projectId).toBe("123");
  });

  it("should render with userId correctly", () => {
    const { container } = render(
      <UsermindFeedback projectId="123" userId="123">
        <button>Click here</button>
      </UsermindFeedback>,
      { container: document.body }
    );

    const element = container.querySelector("button");
    const triggerAttribute = element?.getAttribute("data-usermind-trigger");
    const projectId = element?.getAttribute("data-project-id");
    const userId = element?.getAttribute("data-user-id");

    expect(userId).toBe("123");
    expect(triggerAttribute).toBe("true");
    expect(projectId).toBe("123");
  });
});
