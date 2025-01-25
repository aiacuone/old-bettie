'use client'

import Link from 'next/link'
import { get } from '@/lib/request'
import axios from 'axios'
import { useEffect, useState } from 'react'

type Pokemon_species = {
  name: string
  url: string
}

type Pokedex_Entry = {
  entry_number: number
  pokemon_species: Pokemon_species
}

// gets all the pokemon in a list from our secret api and returns them so you can view each on a new page
export default function Page() {
  const [pokemon, setPokemon] = useState<Pokedex_Entry[]>([])
  const [sortBy, setSortBy] = useState('alphabet')
  const [sortedPokemon, setSortedPokemon] = useState<Pokedex_Entry[]>([])

  useEffect(() => {
    axios
      .get('/api/pokemon')
      .then(({ data: { pokemon } }) => setPokemon(pokemon))
  }, [])

  const sortByInputArray = [
    { label: 'Alphabet', value: 'alphabet' },
    { label: 'Number', value: 'number' },
  ]

  useEffect(() => {
    if (sortBy === 'alphabet') {
      setSortedPokemon(
        [...pokemon].sort((a, b) => a.name.localeCompare(b.name))
      )
    } else {
      setSortedPokemon(
        [...pokemon].sort((a, b) => a.entry_number - b.entry_number)
      )
    }
  }, [sortBy, pokemon])

  return (
    <section className="flex flex-col gap-3">
      <h2>Check out the full list of pokemon here!</h2>
      <div className="flex gap-4">
        <p>Sort By</p>
        {sortByInputArray.map((input, index) => (
          <label key={`sort by ${index}`} className="flex gap-1">
            {input.label}
            <input
              type="radio"
              name="sortBy"
              id={sortBy.value}
              onChange={() => setSortBy(input.value)}
              checked={input.value === sortBy}
            />
          </label>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {sortedPokemon &&
          sortedPokemon.map((poke: Pokedex_Entry, index) => {
            return (
              <Link
                href={`/pokemon/${index + 1}`}
                key={`mapped pokemon link ${index}`}>
                <h4>{poke.name}</h4>
              </Link>
            )
          })}
      </div>
    </section>
  )
}
