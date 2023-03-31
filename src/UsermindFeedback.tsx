import React, { ReactNode, Fragment } from "react";
import { useUsermindFeedback } from "./useUsermindFeedback";

const scriptSrc = "https://usermind.app/usermind.js";

type Props = {
  projectId: string;
  children: ReactNode;
  userId?: string;
  isAlwaysVisible?: boolean;
};

export function UsermindFeedback({
  projectId,
  userId,
  isAlwaysVisible,
  children,
}: Props) {
  useUsermindFeedback(scriptSrc);

  if (!projectId) {
    console.warn("usermind: No projectId provided");
    return null;
  }

  if (!children) {
    console.warn("usermind: No children provided");
    return null;
  }

  return (
    <Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            "data-usermind-trigger": true,
            "data-project-id": projectId,
            ...(userId && { "data-user-id": userId }),
            ...(isAlwaysVisible && { "data-is-always-visible": true }),
          } as any);
        }

        return child;
      })}
    </Fragment>
  );
}
