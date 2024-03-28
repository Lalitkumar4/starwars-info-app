import { useState } from "react"

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Navbar from "./components/Navbar"
import Planets from "./components/Planets"
import People from "./components/People"
import Starships from "./components/Starships"

const queryClient = new QueryClient()

function App() {
  const [page, setPage] = useState("planets")

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? (
            <Planets />
          ) : page === "people" ? (
            <People />
          ) : (
            <Starships />
          )}
        </div>
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default App
