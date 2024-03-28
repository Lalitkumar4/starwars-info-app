import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Planet from "./Planet"
import PaginateButton from "./PaginateButton"
import Spinner from "./Spinner"
import NotFetch404 from "./NotFetch404"

const fetchPlanets = async (page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json()
}

const Planets = () => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["planets", page],
    queryFn: ({ queryKey }) => fetchPlanets(queryKey[1]),
    placeholderData: keepPreviousData,
  })

  return (
    <div>
      <h2>Planets 🌍</h2>

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
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Planets
