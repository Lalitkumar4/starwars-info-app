import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Starship from "./Starship"
import PaginateButton from "./PaginateButton"
import Spinner from "./Spinner"
import NotFetch404 from "./NotFetch404"

const fetchStarships = async (page) => {
  const res = await fetch(`https://swapi.dev/api/starships/?page=${page}`)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json()
}

const Starships = () => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["starships", page],
    queryFn: ({ queryKey }) => fetchStarships(queryKey[1]),
    placeholderData: keepPreviousData,
  })

  return (
    <div>
      <h2>Starships 🚀</h2>

      {status === "pending" && (
        <div>
          <Spinner />
        </div>
      )}

      {status === "error" && (
        <div>
          <NotFetch404 />
        </div>
      )}

      {status === "success" && (
        <>
          <PaginateButton page={page} setPage={setPage} data={data} />
          <div>
            {data.results.map((starship) => (
              <Starship key={starship.name} starship={starship} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Starships
