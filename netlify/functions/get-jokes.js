import fetch from 'node-fetch'

export const handler = async () => {

  const JOKES_API = 'https://api.chucknorris.io/jokes/random';
  const response = await fetch(JOKES_API)
  const data = await response.json()

  return {
    statusCode: 200,
    body: JSON.stringify({
      data
    }),
  }
}
