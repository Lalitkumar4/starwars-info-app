const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>Planets</button>
      <button onClick={() => setPage("people")}>People</button>
      <button onClick={() => setPage("starship")}>Starships</button>
    </nav>
  )
}

export default Navbar
