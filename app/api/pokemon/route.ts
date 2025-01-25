import axios from 'axios'

export async function GET() {
  const pokemon = await axios
    .get(process.env.SECRET_API)
    .then((res) => res.data.results)

  return new Response(JSON.stringify({ pokemon }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
