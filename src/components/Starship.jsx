const Starship = ({ starship }) => {
  return (
    <div className="card">
      <h3>{starship.name}</h3>
      <p>Model - {starship.model}</p>
      <p>Maximun Atmosphering Speed - {starship.max_atmosphering_speed}</p>
      <p>Crew - {starship.crew}</p>
      <p>Cargo capacity - {starship.cargo_capacity}</p>
      <p>Starship class- {starship.starship_class}</p>
    </div>
  )
}

export default Starship
