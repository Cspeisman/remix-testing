import type { Greeting } from "@prisma/client";
import {db} from "../../prisma/db.server";

export interface GreetingPayload {
  greeting: string;
}

export interface GreetingRepository {
  getGreeting(): Promise<Greeting>;
  updateGreeting(): void;
}

export class DBGreetingRepo implements GreetingRepository {
  async getGreeting(): Promise<Greeting> {
    let greetings = await db.greeting.findMany();
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  updateGreeting(): void {
  }
}
export class InMemoryGreetingRepo implements GreetingRepository {
  greetings = ['Hello!', 'What\'s up?', 'Hi!', 'Shalom!', 'Hey there!', 'Salutations'];
  greeting: string;

  constructor(greeting?: string) {
    if (greeting) {
      this.greeting = greeting;
    } else {
      this.greeting = this.getRandomGreeting();
    }
  }

  getGreeting(): Promise<Greeting> {
    return Promise.resolve({greeting: this.greeting, id: -1});
  }

  updateGreeting(): void {
    this.greeting = this.getRandomGreeting();
  }

  private getRandomGreeting() {
    return this.greetings[Math.floor(Math.random() * this.greetings.length)];
  }
}

export let inMemoryGreetingRepo = new InMemoryGreetingRepo('Welcome to Remix!');
export let dbGreetingRepo = new DBGreetingRepo();
