import { render } from "@testing-library/react";
import { ReactNode } from "react";

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";
// export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
