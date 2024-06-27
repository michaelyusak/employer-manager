export async function getFromElastic(url: string, body?: string) {
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: body,
  };

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    throw new Error('failed to fetch from elastic');
  }

  return responseData;
}
