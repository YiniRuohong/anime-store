const petals = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  left: 4 + index * 8,
  delay: (index % 6) * 1.15,
  duration: 8 + (index % 4) * 1.4,
}))

export function Petals() {
  return (
    <div aria-hidden="true">
      {petals.map((petal) => (
        <span
          className="sakura-petal"
          key={petal.id}
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
