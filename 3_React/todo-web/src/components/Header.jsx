export function Header({ total = 0, completed = 0 }) {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <header className="app-header">
      <p className="app-date">{today}</p>
      <h1 className="app-title">Today</h1>

      <p className="progress-label">
        {
          total === 0 ? (
            'No tasks yet'
          ) : (
            <>
              <strong>{completed}</strong> of {total} done
            </>
          )
        }
      </p>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </header>
  )
}
