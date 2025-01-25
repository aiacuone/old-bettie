import axios from 'axios'
import { get } from '@/lib/request'

export async function GET() {
  const pokemon = await get(process.env.SECRET_API).then(
    (res) => res.data.results
  )

  return new Response(JSON.stringify({ pokemon }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
