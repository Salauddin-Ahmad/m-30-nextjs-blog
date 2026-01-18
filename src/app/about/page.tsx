export default async function AboutLoading() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return <div>this is about page</div>;
}
