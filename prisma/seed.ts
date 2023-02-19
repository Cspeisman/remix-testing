import {db} from "./db.server";

async function seed() {
  await Promise.all(
    ['Hello!', 'What\'s up?', 'Hi!', 'Shalom!', 'Hey there!', 'Salutations'].map((greeting) => {
      return db.greeting.create({data: {greeting}});
    })
  );
}

seed();
