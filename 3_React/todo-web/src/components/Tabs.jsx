const TABS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
]

export function Tabs({ active = 'all', counts = {}, setCurrentTab}) {

  return (
    <nav className="tabs" aria-label="Filter tasks">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          className={active === tab.key ? 'tab is-active' : 'tab'}
          type="button"
          onClick={() => {setCurrentTab(newState);}}
        >
          {tab.label}
          <span className="tab-count">{counts[tab.key] ?? 0}</span>
        </button>
      ))}
    </nav>
  )
}
