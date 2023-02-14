import type { GreetingRepository} from "./app/greeting/greetingRepository";
import {FakeRepository, HttpRepository} from "./app/greeting/greetingRepository";

interface Repos {
  greetingRepository: GreetingRepository
}

const repos: Repos = {
  greetingRepository: new HttpRepository(),
}

const testRepos: Repos = {
  greetingRepository: new FakeRepository(),
}

export const getRepository = <T>(repoName: keyof Repos): T => {
  if (process.env.NODE_ENV === "test") {
    return testRepos[repoName] as unknown as T;
  }
  return repos[repoName] as unknown as T;
}
