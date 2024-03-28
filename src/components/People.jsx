import { useState } from "react"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

import Person from "./Person"
import PaginateButton from "./PaginateButton"
import Spinner from "./Spinner"
import NotFetch404 from "./NotFetch404"

const fetchPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`)
  if (!res.ok) {
    throw new Error("Something went wrong")
  }
  return res.json()
}

const People = () => {
  const [page, setPage] = useState(1)

  const { data, status } = useQuery({
    queryKey: ["people", page],
    queryFn: ({ queryKey }) => fetchPeople(queryKey[1]),
    placeholderData: keepPreviousData,
  })

  return (
    <div>
      <h2>People 🧑‍🚀</h2>

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
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default People
