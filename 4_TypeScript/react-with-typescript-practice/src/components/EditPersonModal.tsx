import { useState } from "react"
import { Gender, type Person } from "../PersonContext"

type EditPersonModalProps = {
    person: Person;
    onSave: (person: Person) => void;
}

// One instance per person, so each modal owns its own form state. Nothing is shared
// between people, and the id is never touched, so a save can only ever update this person.
export const EditPersonModal = ({ person, onSave }: EditPersonModalProps) => {
    const [form, setForm] = useState<Person>(person);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) {
        const { name, value, type } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
    }

    // Closing the popover (Cancel, Save, Esc, click outside) discards unsaved typing
    // by putting this modal's own state back to the person's saved values.
    function handleToggle(event: React.ToggleEvent<HTMLDivElement>) {
        if (event.newState === "closed") setForm(person);
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        onSave(form);
        // popovertarget is ignored on a submit button inside a form, so close it ourselves
        // (this also covers submitting with the Enter key).
        event.currentTarget.closest<HTMLElement>("[popover]")?.hidePopover();
    }

    return (
        <div id={`edit-${person.id}`} popover="auto" className="pi-modal" onToggle={handleToggle}>
            <form onSubmit={handleSubmit}>
                <header className="pi-card-header">
                    <h2>Edit {person.firstName} {person.lastName}</h2>
                    <p>Update the details, then save your changes.</p>
                </header>

                <div className="pi-grid">
                    <div className="pi-field">
                        <label htmlFor={`${person.id}-firstName`}>First name</label>
                        <input name="firstName" id={`${person.id}-firstName`} type="text" value={form.firstName} onChange={handleChange} />
                    </div>
                    <div className="pi-field">
                        <label htmlFor={`${person.id}-lastName`}>Last name</label>
                        <input name="lastName" id={`${person.id}-lastName`} type="text" value={form.lastName} onChange={handleChange} />
                    </div>

                    <div className="pi-field">
                        <label htmlFor={`${person.id}-email`}>Email</label>
                        <input name="email" id={`${person.id}-email`} type="email" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="pi-field">
                        <label htmlFor={`${person.id}-phone`}>Phone</label>
                        <input name="phone" id={`${person.id}-phone`} type="tel" value={form.phone} onChange={handleChange} />
                    </div>

                    <div className="pi-field">
                        <label htmlFor={`${person.id}-age`}>Age</label>
                        <input name="age" id={`${person.id}-age`} type="number" min={0} value={form.age || ""} onChange={handleChange} />
                    </div>
                    <div className="pi-field">
                        <label htmlFor={`${person.id}-dob`}>Date of birth</label>
                        <input name="dob" id={`${person.id}-dob`} type="date" value={form.dob} onChange={handleChange} />
                    </div>

                    <div className="pi-field pi-full">
                        <label htmlFor={`${person.id}-gender`}>Gender</label>
                        <select name="gender" id={`${person.id}-gender`} value={form.gender} onChange={handleChange}>
                            <option value="" disabled>Select…</option>
                            {Object.values(Gender).map((g) => (
                                <option value={g} key={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    {/* Radios carry no value of their own, so each one sets isMarried explicitly. */}
                    <fieldset className="pi-field pi-full pi-radio-group">
                        <legend>Marital status</legend>
                        <label className="pi-radio">
                            <input type="radio" name={`${person.id}-marital`} checked={!form.isMarried}
                                onChange={() => setForm(prev => ({ ...prev, isMarried: false }))} /> Single
                        </label>
                        <label className="pi-radio">
                            <input type="radio" name={`${person.id}-marital`} checked={form.isMarried}
                                onChange={() => setForm(prev => ({ ...prev, isMarried: true }))} /> Married
                        </label>
                    </fieldset>

                    <div className="pi-field pi-full">
                        <label htmlFor={`${person.id}-address`}>Address</label>
                        <input name="address" id={`${person.id}-address`} type="text" value={form.address} onChange={handleChange} />
                    </div>

                    <div className="pi-field">
                        <label htmlFor={`${person.id}-city`}>City</label>
                        <input name="city" id={`${person.id}-city`} type="text" value={form.city} onChange={handleChange} />
                    </div>
                    <div className="pi-field">
                        <label htmlFor={`${person.id}-country`}>Country</label>
                        <input name="country" id={`${person.id}-country`} type="text" value={form.country} onChange={handleChange} />
                    </div>

                    <div className="pi-field pi-full">
                        <label htmlFor={`${person.id}-bio`}>Short bio</label>
                        <textarea name="shortBio" id={`${person.id}-bio`} rows={3} value={form.shortBio} onChange={handleChange} />
                    </div>
                </div>

                <div className="pi-actions">
                    <button type="button" className="pi-btn pi-btn-ghost" popoverTarget={`edit-${person.id}`} popoverTargetAction="hide">Cancel</button>
                    <button type="submit" className="pi-btn pi-btn-primary">Save changes</button>
                </div>
            </form>
        </div>
    )
}
