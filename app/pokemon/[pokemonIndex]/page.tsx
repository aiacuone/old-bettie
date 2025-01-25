import { get } from '@/lib/request'
import Image from 'next/image'
import Link from 'next/link'

export const PokemonPage = async ({ params }) => {
  const { pokemonIndex } = params

  const pokemon = await get(`${process.env.SECRET_API}/${pokemonIndex}`).then(
    (res) => res
  )

  const {
    name: pokemonName,
    sprites: { front_default: pokemonImageSource },
  } = pokemon.data

  return (
    <div>
      <p>{pokemonName}</p>
      <Image
        src={pokemonImageSource}
        alt="Pokemon image"
        width={100}
        height={100}
      />
      <Link href={'/pokemon'} className="text-white">
        Back
      </Link>
    </div>
  )
}

export default PokemonPage
