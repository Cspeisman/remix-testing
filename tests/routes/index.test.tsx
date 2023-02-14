import {describe, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {unstable_createRemixStub} from "@remix-run/testing";
import Index, {loader} from "../../app/routes";


describe('index', () => {
  it('should run', async () => {
    const RemixStub = unstable_createRemixStub([
      {
        path: "/",
        index: true,
        element: <Index />,
        loader,
      },
    ]);

    render(<RemixStub />);
    await screen.findByText("Welcome to Remix");
  });
})
