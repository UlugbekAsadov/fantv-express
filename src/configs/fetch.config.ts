import { config } from '.';

export async function fetcher<T = any, B = any>(method: 'POST', url: string, body: B): Promise<T> {
  const response = await fetch(config.BASE_PATH + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      body,
    }),
  });

  const data = response.json();

  return data;
}
