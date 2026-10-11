
function App() {
  return (
    <div class="board">
    <div class="board__head">
      <div class="head__top">
        <div>
          <div class="eyebrow">Personal board</div>
          <h1 class="title">Kanban Board</h1>
        </div>
        <button class="btn-primary"><span class="plus">+</span>Add Task</button>
      </div>

      <div class="toolbar">
        <div class="search">
          <span class="search__icon">⌕</span>
          <input type="text" placeholder="Search title or description…"/>
        </div>
        <label class="filter">Priority
          <select>
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>
    </div>

    <div class="columns">


      <div class="column">
        <div class="column__head">
          <span class="column__dot dot-todo"></span>
          <span class="column__label">Todo</span>
          <span class="column__count">2</span>
        </div>


        <div class="card">
          <div class="card__prio prio-high"><span class="pdot"></span>High</div>
          <div class="card__title">Learn JavaScript closures</div>
          <div class="card__desc">Finish the scope &amp; closures chapter</div>
          <div class="card__actions">
            <button class="icon-btn" disabled title="Move back">‹</button>
            <button class="icon-btn" title="Move forward">›</button>
            <select class="move-select" title="Move to">
              <option value="">Move to…</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <span class="spacer"></span>
            <button class="link-btn">Edit</button>
            <button class="link-btn link-btn--danger">Delete</button>
          </div>
        </div>

        <div class="card">
          <div class="card__prio prio-low"><span class="pdot"></span>Low</div>
          <div class="card__title">Practice array methods</div>
          <div class="card__desc">map, filter, reduce exercises</div>
          <div class="card__actions">
            <button class="icon-btn" disabled title="Move back">‹</button>
            <button class="icon-btn" title="Move forward">›</button>
            <select class="move-select" title="Move to">
              <option value="">Move to…</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <span class="spacer"></span>
            <button class="link-btn">Edit</button>
            <button class="link-btn link-btn--danger">Delete</button>
          </div>
        </div>
      </div>


      <div class="column">
        <div class="column__head">
          <span class="column__dot dot-doing"></span>
          <span class="column__label">Doing</span>
          <span class="column__count">2</span>
        </div>

        <div class="card">
          <div class="card__prio prio-high"><span class="pdot"></span>High</div>
          <div class="card__title">Build React project</div>
          <div class="card__desc">Kanban board with localStorage</div>
          <div class="card__actions">
            <button class="icon-btn" title="Move back">‹</button>
            <button class="icon-btn" title="Move forward">›</button>
            <select class="move-select" title="Move to">
              <option value="">Move to…</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <span class="spacer"></span>
            <button class="link-btn">Edit</button>
            <button class="link-btn link-btn--danger">Delete</button>
          </div>
        </div>

        <div class="card">
          <div class="card__prio prio-medium"><span class="pdot"></span>Medium</div>
          <div class="card__title">React Router basics</div>
          <div class="card__desc">Routes, links and navigation</div>
          <div class="card__actions">
            <button class="icon-btn" title="Move back">‹</button>
            <button class="icon-btn" title="Move forward">›</button>
            <select class="move-select" title="Move to">
              <option value="">Move to…</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <span class="spacer"></span>
            <button class="link-btn">Edit</button>
            <button class="link-btn link-btn--danger">Delete</button>
          </div>
        </div>
      </div>


      <div class="column">
        <div class="column__head">
          <span class="column__dot dot-done"></span>
          <span class="column__label">Done</span>
          <span class="column__count">2</span>
        </div>


        <div class="card">
          <div class="card__prio prio-low"><span class="pdot"></span>Low</div>
          <div class="card__title">Learn HTML</div>
          <div class="card__actions">
            <button class="icon-btn" title="Move back">‹</button>
            <button class="icon-btn" disabled title="Move forward">›</button>
            <select class="move-select" title="Move to">
              <option value="">Move to…</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <span class="spacer"></span>
            <button class="link-btn">Edit</button>
            <button class="link-btn link-btn--danger">Delete</button>
          </div>
        </div>

        <div class="card">
          <div class="card__prio prio-medium"><span class="pdot"></span>Medium</div>
          <div class="card__title">CSS flexbox &amp; grid</div>
          <div class="card__desc">Layout practice</div>
          <div class="card__actions">
            <button class="icon-btn" title="Move back">‹</button>
            <button class="icon-btn" disabled title="Move forward">›</button>
            <select class="move-select" title="Move to">
              <option value="">Move to…</option>
              <option value="todo">Todo</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <span class="spacer"></span>
            <button class="link-btn">Edit</button>
            <button class="link-btn link-btn--danger">Delete</button>
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default App
