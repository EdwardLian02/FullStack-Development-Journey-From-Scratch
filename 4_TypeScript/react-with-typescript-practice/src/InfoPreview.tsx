// import { useContext } from "react"
// import { PersonContext } from "./PersonContext"

// export const InfoPreview = () => {
//      const {personList} = useContext(PersonContext)

    
//     const avaterText:string = `${ person?.firstName.charAt(0)}${person?.lastName.charAt(0)}`

//     return (
//         <aside className="pi-card pi-preview">
//             <div className="pi-avatar">{avaterText} </div>
//             <h2 className="pi-name">{person?.firstName} {person?.lastName} </h2>
//             <p className="pi-subtitle">{person?.age} years old · {person?.isMarried ? "Married" : "Single"} </p>

//             <dl className="pi-details">
//                 <div>
//                     <dt>Email</dt>
//                     <dd>{person?.email} </dd>
//                 </div>
//                 <div>
//                     <dt>Phone</dt>
//                     <dd>{person?.phone} </dd>
//                 </div>
//                 <div>
//                     <dt>Date of birth</dt>
//                     <dd>{person?.dob} </dd>
//                 </div>
//                 <div>
//                     <dt>Gender</dt>
//                     <dd>{person?.gender} </dd>
//                 </div>
//                 <div>
//                     <dt>Address</dt>
//                     <dd> {person?.address} </dd>
//                 </div>
//             </dl>

//             <div className="pi-bio">
//                 <h3>About</h3>
//                 <p>{person?.shortBio}</p>
//             </div>
//         </aside>
//     )
// }
