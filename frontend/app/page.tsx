import getMe from "./get-me";

export default async function Home() {
  const me = await getMe();
  console.log('me: ', me);
  return (
    <>
      <h1>Shoppy</h1>
    </>
  );
}
