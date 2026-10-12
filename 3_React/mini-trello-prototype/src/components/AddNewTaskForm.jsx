import { useForm } from "react-hook-form";
function AddNewTaskForm({onSubmit, onCancel}){


    const { 
        register, 
        watch, 
        setValue,
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: { 
            priority: 'medium', 
            status: 'todo'
        }
    });

    //Get priority
    const currentPriority = watch("priority")

    return (
      
        <div className="backdrop">
          <form className="modal" onSubmit={handleSubmit(onSubmit)}>
            <div className="modal__title">New task</div>

            <label className="field" >Title
              <input type="text" placeholder="e.g. Learn React Router"  
              {...register('title',{
                required: "Title is required"
            })}/>
            </label>

            <label className="field">Description <span className="optional">optional</span>
              <textarea rows="3" {...register('description', {
                required: "Description is required"
              })}></textarea>
            </label>

            <div className="field">Priority
              <div className="prio-picker">
                <button type="button"className={`prio-opt ${currentPriority === 'low'? 'prio-opt--active': ''} `} onClick={() => setValue("priority", "low")}>
                  <span className="pdot" style={{background:'var(--prio-low)'}}></span>Low
                </button>
                <button type="button" className={`prio-opt ${currentPriority === 'medium'? 'prio-opt--active': ''} `} onClick={() => setValue("priority", "medium")}>
                  <span className="pdot" style={{background:'var(--prio-medium)'}}></span>Medium
                </button>
                <button type="button" className={`prio-opt ${currentPriority === 'high'? 'prio-opt--active': ''} `} onClick={() => setValue("priority", "high")}>
                  <span className="pdot" style={{background:"var(--prio-high)"}}></span>High
                </button>
              </div>
            </div>

            <div className="modal__actions">
              <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
              <button type="submit" className="btn-submit">Create Task</button>
            </div>
          </form>
        </div>
 
    );

}

export default AddNewTaskForm;