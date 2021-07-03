import React, { useState, FormEvent, useCallback } from "react"

import { SearchResults } from "../components/SearchResults";

interface Results {
  totalItems: number;
  data: any[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({
    totalItems: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map(product => {
      return {
        ...product,
        priceFormated: formatter.format(product.price)
      }
    });

    const totalItems = data.length;

    setResults({ totalItems, data: products });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          id="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <br />
      <SearchResults 
      results={results.data} 
      totalItems={results.totalItems}
      onAddToWishlist={addToWishlist} />
    </div>
  )
}
