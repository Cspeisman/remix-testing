
export interface GreetingPayload {
  greeting: string;
}

export interface GreetingRepository {
  getGreeting(): Promise<GreetingPayload>;
}
export class HttpRepository implements GreetingRepository {
  async getGreeting(): Promise<GreetingPayload> {
    const response = await fetch('http://localhost:3000/api/greeting');
    return await response.json();
  }
}

export class FakeRepository implements GreetingRepository {
  getGreeting(): Promise<GreetingPayload> {
    return Promise.resolve({greeting: 'Welcome to Remix'});
  }
}
