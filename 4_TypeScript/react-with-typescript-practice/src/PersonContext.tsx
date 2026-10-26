import { createContext, useEffect, useState } from "react";

export const Gender = {
  Male: 'Male',
  Female: 'Female',
  Other: 'Other',
  None: 'None',
} as const

export interface Person {
    id: string, 
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    dob: string;
    isMarried: boolean;
    gender: string,
    address: string;
    city: string;
    country: string;
    shortBio: string;
}



interface PersonContextType {
    personList: Person[] | null;
    submitInfo: (person:Person) => void;
    editPerson: (id: string, person: Person) => void;
    deletePerson: (id: string) => void;
}


export const PersonContext = createContext<PersonContextType>({
    personList: [], submitInfo: () => null,
    editPerson: (id: string, person: Person) => null,
    deletePerson:  (id: string) => null
})

interface Props{
    children: React.ReactNode
}
export const PersonProvider = (props: Props ) => {
    const [personList, setPersonList] = useState<Person[]>([]);

    useEffect(() => {
        setPersonList([]);
    },[])

     const submitInfo = (person:Person) => {
            setPersonList((prev) => [...prev, person])
    }

    const editPerson = (id: string, updatedPerson:Person) => {

        setPersonList((prevPersonList) => prevPersonList.map(
            (p) => p.id === id? updatedPerson : p
        ))

    };

    const deletePerson  = (id: string) => {
        setPersonList((prevList) => prevList.filter((p) => p.id !== id))
    };

    return <PersonContext.Provider value={{personList, submitInfo, editPerson, deletePerson}}> {props.children} </PersonContext.Provider>
}
