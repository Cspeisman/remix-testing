
export async function loader() {
  const greetings = ['hi', 'hello!!', 'hola!', 'what\'s up'];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  return {greeting};
}
