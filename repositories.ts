import type {GreetingRepository} from "./app/greeting/greetingRepository";
import {dbGreetingRepo, inMemoryGreetingRepo} from "./app/greeting/greetingRepository";

interface Repos {
  greetingRepository: GreetingRepository
}

const repos: Repos = {
  greetingRepository: dbGreetingRepo,
}

const testRepos: Repos = {
  greetingRepository: inMemoryGreetingRepo,
}

export const getRepository = <T>(repoName: keyof Repos): T => {
  if (process.env.NODE_ENV === "test") {
    return testRepos[repoName] as unknown as T;
  }
  return repos[repoName] as unknown as T;
}
