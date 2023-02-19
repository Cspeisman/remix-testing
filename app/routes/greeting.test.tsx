import {describe, it} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {unstable_createRemixStub} from "@remix-run/testing";
import Greeting, {action, loader} from "./greeting";
import type {GreetingRepository, InMemoryGreetingRepo} from "../greeting/greetingRepository";
import {getRepository} from "../../repositories";
import {redirect} from "@remix-run/node";


describe('Greeting', () => {
  it('should load a greeting', async () => {
    const RemixStub = unstable_createRemixStub([
      {
        path: "/greeting",
        index: true,
        element: <Greeting/>,
        loader,
      },
    ]);

    render(<RemixStub initialEntries={['/greeting']}/>);
    await screen.findByText("Welcome to Remix!");
  });

  it('should update the greeting when action is called', async () => {
    const greetingRepo = getRepository<GreetingRepository>('greetingRepository');
    greetingRepo.updateGreeting = () => {
      (greetingRepo as InMemoryGreetingRepo).greeting = 'updated!';
    };
    const RemixStub = unstable_createRemixStub([
      {
        path: "/greeting",
        element: <Greeting/>,
        action,
        loader,
      }]);

    render(<RemixStub initialEntries={['/greeting']}/>);
    redirect('/greeting');
    let button = await screen.findByText('refresh');
    fireEvent.click(button);

    await screen.findByText('updated!');
  });
})
