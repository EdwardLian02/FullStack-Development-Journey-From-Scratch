const TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
]

// Static: `active` just decides which tab gets the highlighted style.
// No click handling — purely a visual.
export function Tabs({ active = 'all', counts = {} }) {
  return (
    <nav className="tabs" aria-label="Filter tasks">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={active === tab.key ? 'tab is-active' : 'tab'}
          type="button"
        >
          {tab.label}
          <span className="tab-count">{counts[tab.key] ?? 0}</span>
        </button>
      ))}
    </nav>
  )
}
