export async function getFromElastic(url: string) {
  const response = await fetch(url);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('failed to fetch from elastic');
  }

  return responseData;
}
