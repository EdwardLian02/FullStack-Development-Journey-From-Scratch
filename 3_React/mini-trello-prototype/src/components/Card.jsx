import { useRef, useState } from "react";
import Draggable from "react-draggable";

function Card({task, onDelete, changeStatus, columnRefs}){
    const nodeRef = useRef(null);
    const [dragKey, setDragKey] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleChange = (event) => {
        changeStatus(task, event.target.value);
        event.target.value = ""
    };

    function handleStop(){
        setIsDragging(false);
        setDragKey((prev) => prev + 1);

        const cardRect = nodeRef.current.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        const targetStatus = Object.entries(columnRefs.current).find(([, columnEl]) => {
            if (!columnEl) return false;
            const rect = columnEl.getBoundingClientRect();
            return (
                cardCenterX >= rect.left &&
                cardCenterX <= rect.right &&
                cardCenterY >= rect.top &&
                cardCenterY <= rect.bottom
            );
        })?.[0];

        if (targetStatus && targetStatus !== task.status) {
            changeStatus(task, targetStatus);
        }
    }

    return (
         <Draggable
            key={dragKey}
            nodeRef={nodeRef}
            onStart={() => setIsDragging(true)}
            onStop={handleStop}
         >
         <div ref={nodeRef} className={`card${isDragging ? " card--dragging" : ""}`}>
                    <div className="card__prio prio-high"><span className="pdot"></span>{task.priority}</div>
                    <div className="card__title">{task.title}</div>
                    <div className="card__desc">{task.description}</div>
                    <div className="card__actions">
                        <button className="icon-btn" disabled title="Move back">‹</button>
                        <button className="icon-btn" title="Move forward">›</button>
                        <select className="move-select" title="Move to" onChange={handleChange}>
                            <option value="">Move to…</option>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                        <span className="spacer"></span>
                        <button className="link-btn">Edit</button>
                        <button className="link-btn link-btn--danger" onClick={() =>onDelete(task)} >Delete</button>
                    </div>
        </div>
         </Draggable>
    );
}

export default Card;
