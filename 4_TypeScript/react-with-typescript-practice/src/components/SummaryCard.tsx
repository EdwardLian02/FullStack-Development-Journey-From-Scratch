import type { Person } from "../PersonContext";

type SummaryCardProps = {
    person: Person;
}
export const SummaryCard = ({ person }: SummaryCardProps) => {


        const avaterText :string = `${ person?.firstName.charAt(0)}${person?.lastName.charAt(0)}`

    return (
        <summary className="pi-person-header">
            <span className="pi-person-avatar">{avaterText}</span>
            <span className="pi-person-name">{person.firstName} {person.lastName}</span>
            <span className="pi-person-chevron" aria-hidden="true">▾</span>
        </summary>
    )
}