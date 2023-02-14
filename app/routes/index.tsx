import {useLoaderData} from "@remix-run/react";
import type {GreetingPayload, GreetingRepository} from "../greeting/greetingRepository";
import {json} from "@remix-run/node";
import {getRepository} from "../../repositories";

export async function loader() {
  const repository = getRepository<GreetingRepository>('greetingRepository');
  const payload = await repository.getGreeting();
  return json(payload);
}

export default function Index() {
  const data = useLoaderData<GreetingPayload>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{data.greeting}</h1>
    </div>
  );
}
