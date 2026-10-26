// Column 2: static UI only. No React state — expanding uses <details>, and the

import { useContext } from "react"
import { SummaryCard } from "./components/SummaryCard"
import { EditPersonModal } from "./components/EditPersonModal"
import { PersonContext } from "./PersonContext"

// Edit / Delete popups use the browser's native Popover API (popovertarget).
// const samplePeople = [
//     {
//         id: "p1", initials: "AM", firstName: "Aung", lastName: "Min", email: "aung@example.com",
//         phone: "+95 9 123 456 789", age: 20, dob: "2006-03-14", gender: "Male", isMarried: false,
//         address: "No. 12, Main Street", city: "Yangon", country: "Myanmar",
//         bio: "Learning full-stack development one project at a time.",
//     },
//     {
//         id: "p2", initials: "MT", firstName: "May", lastName: "Thu", email: "may@example.com",
//         phone: "+95 9 987 654 321", age: 27, dob: "1999-08-02", gender: "Female", isMarried: true,
//         address: "45 Lake Road", city: "Mandalay", country: "Myanmar",
//         bio: "",
//     },
// ]


export const PersonList = () => {

    const { personList, editPerson, deletePerson } = useContext(PersonContext)


    return (
        <aside className="pi-card pi-list">
            <header className="pi-card-header">
                <h2>People <span className="pi-count">{personList?.length}</span></h2>
                <p>Saved entries appear here. Click a card to see the details.</p>
            </header>

            <ul className="pi-person-list">
                {personList?.map((p) => (
                    <li key={p.id}>
                        <details className="pi-person">

                            <SummaryCard person={p} />
                            <div className="pi-person-body">
                                <dl className="pi-details">
                                    <div><dt>Email</dt><dd>{p.email}</dd></div>
                                    <div><dt>Phone</dt><dd>{p.phone}</dd></div>
                                    <div><dt>Age</dt><dd>{p.age}</dd></div>
                                    <div><dt>Date of birth</dt><dd>{p.dob}</dd></div>
                                    <div><dt>Gender</dt><dd>{p.gender}</dd></div>
                                    <div><dt>Marital status</dt><dd>{p.isMarried ? "Married" : "Single"}</dd></div>
                                    <div><dt>Address</dt><dd>{p.address}</dd></div>
                                    <div><dt>City</dt><dd>{p.city}</dd></div>
                                    <div><dt>Country</dt><dd>{p.country}</dd></div>
                                </dl>

                                {p.shortBio && (
                                    <div className="pi-bio">
                                        <h3>About</h3>
                                        <p>{p.shortBio}</p>
                                    </div>
                                )}

                                <div className="pi-person-actions">
                                    <button type="button" className="pi-btn pi-btn-ghost" popoverTarget={`edit-${p.id}`}>Edit</button>
                                    <button type="button" className="pi-btn pi-btn-ghost pi-btn-danger-text" popoverTarget={`delete-${p.id}`}>Delete</button>
                                </div>
                            </div>
                        </details>

                        {/* Edit popup: its own component, so each person has their own form state */}
                        <EditPersonModal person={p} onSave={(updated) => editPerson(p.id, updated)} />

                        {/* Delete popup: confirmation */}
                        <div id={`delete-${p.id}`} popover="auto" className="pi-modal pi-modal-small">
                            <h2 className="pi-modal-title">Delete {p.firstName} {p.lastName}?</h2>
                            <p className="pi-modal-text">This will permanently remove this person from the list. This can't be undone.</p>
                            <div className="pi-actions">
                                <button type="button" className="pi-btn pi-btn-ghost" popoverTarget={`delete-${p.id}`} popoverTargetAction="hide">Cancel</button>
                                <button type="button" className="pi-btn pi-btn-danger" popoverTarget={`delete-${p.id}`} popoverTargetAction="hide" onClick={() => deletePerson(p.id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
