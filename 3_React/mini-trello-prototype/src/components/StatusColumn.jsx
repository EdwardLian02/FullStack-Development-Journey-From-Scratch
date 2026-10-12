import Card from "./Card";
function StatusColumn({status, tasks, onDelete, changeStatus, columnRefs, onColumnRef}){

    return (
         <div className="column" ref={(el) => onColumnRef(status, el)}>
        <div className="column__head">
          <span className="column__dot dot-todo"></span>
          <span className="column__label">{status.toUpperCase()}</span>
          <span className="column__count">{tasks.length}</span>
        </div>

        {
            tasks.map((task) => (
              <Card key={task.id} task={task} onDelete={onDelete} changeStatus={changeStatus} columnRefs={columnRefs} />

            ))
        }
      </div>
    );
}


export default StatusColumn;
