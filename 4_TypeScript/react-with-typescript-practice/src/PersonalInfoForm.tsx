import { useContext, useState } from "react"
import { Gender, PersonContext, type Person } from "./PersonContext"

type FormErrors = Partial<Record<keyof Person, string>>;

// Column 1: static form. No state, no handlers — wire these up yourself as practice.
export const PersonalInfoForm = () => {
    const { submitInfo } = useContext(PersonContext);
    const [firstName, setFirstName] = useState<string | null>("");
    const [lastName, setLastName] = useState<string | null>("");
    const [email, setEmail] = useState<string | null>("");
    const [phone, setPhone] = useState<string | null>("");
    const [age, setAge] = useState<number | null>(null);
    const [dob,setDob ] = useState<string | null>("");
    const [isMarried, setIsMarried] = useState<boolean>(false);
    const [address, setAddress] = useState<string | null>("");
    const [city, setCity] = useState<string | null>("");
    const [country, setCountry] = useState<string | null>("");
    const [shortBio, setShortBio] = useState<string | null>("");
    const [gender, setGender] = useState<string>("")
    const [errors, setErrors] = useState<FormErrors>({});

    // Returns one message per invalid field; an empty object means the form is valid.
    function validate(): FormErrors {
        const result: FormErrors = {};

        if (!firstName?.trim()) result.firstName = "First name is required.";
        if (!lastName?.trim()) result.lastName = "Last name is required.";

        if (!email?.trim()) result.email = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) result.email = "Enter a valid email address.";

        if (!phone?.trim()) result.phone = "Phone is required.";
        else if (!/^\+?[\d\s-]{7,15}$/.test(phone)) result.phone = "Enter a valid phone number (7-15 digits).";

        if (age === null || age === 0) result.age = "Age is required.";
        else if (!Number.isInteger(age) || age < 1 || age > 120) result.age = "Age must be a whole number between 1 and 120.";

        if (!dob) result.dob = "Date of birth is required.";
        else if (new Date(dob) > new Date()) result.dob = "Date of birth can't be in the future.";

        if (!gender) result.gender = "Please select a gender.";

        if (!address?.trim()) result.address = "Address is required.";
        if (!city?.trim()) result.city = "City is required.";
        if (!country?.trim()) result.country = "Country is required.";

        if ((shortBio?.length ?? 0) > 300) result.shortBio = "Bio must be 300 characters or fewer.";

        return result;
    }

    function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);
        console.log("validationErrors", validationErrors)
        if (Object.keys(validationErrors).length > 0) return;

        const person: Person = {
            id: crypto.randomUUID(),
            firstName: firstName || "",
            lastName: lastName ||"", 
            email: email ||"", 
            phone: phone ||"", 
            age: age || 0, 
            dob: dob ||"", 
            isMarried: isMarried,
            address: address ||"", 
            gender: gender, 
            city: city||"", 
            country: country||"", 
            shortBio: shortBio||"", 
        }

        submitInfo(person)
        handleReset();
    }


    function handleReset(){
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAge(null);
        setDob("");
        setIsMarried(false);
        setAddress("");
        setCity("");
        setCountry("");
        setShortBio("");
        setGender("");
        setErrors({});
    }

    return (
       
            <form className="pi-card" onSubmit={(event) => handleSubmit(event)} onReset={handleReset} noValidate>
                <header className="pi-card-header">
                    <h2>Personal Information</h2>
                    <p>Fill in your details and watch the preview update.</p>
                </header>

                <div className="pi-grid">
                    <div className="pi-field">
                        <label htmlFor="firstName">First name</label>
                        <input id="firstName" type="text" placeholder="Aung" onChange={(event) => setFirstName(event.target.value)} value={firstName || ""} />
                        {errors.firstName && <span className="pi-error">{errors.firstName}</span>}
                    </div>
                    <div className="pi-field">
                        <label htmlFor="lastName">Last name</label>
                        <input id="lastName" type="text" placeholder="Min" onChange={(event) => setLastName(event.target.value)}  value={lastName || ""}/>
                        {errors.lastName && <span className="pi-error">{errors.lastName}</span>}
                    </div>

                    <div className="pi-field">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" placeholder="you@example.com" onChange={(event) => setEmail(event.target.value)} value={email || ""}/>
                        {errors.email && <span className="pi-error">{errors.email}</span>}
                    </div>
                    <div className="pi-field">
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" type="tel" placeholder="+95 9 123 456 789" onChange={(event) => setPhone(event.target.value)} value={phone || ""} />
                        {errors.phone && <span className="pi-error">{errors.phone}</span>}
                    </div>

                    <div className="pi-field">
                        <label htmlFor="age">Age</label>
                        <input id="age" type="number" min={0} placeholder="20" onChange={(event) => setAge(Number(event.target.value))} value={age || ""} />
                        {errors.age && <span className="pi-error">{errors.age}</span>}
                    </div>
                    <div className="pi-field">
                        <label htmlFor="birthDate">Date of birth</label>
                        <input id="birthDate" type="date" onChange={(event) => setDob(event.target.value)}  value={dob || ""}/>
                        {errors.dob && <span className="pi-error">{errors.dob}</span>}
                    </div>

                    <div className="pi-field pi-full">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" defaultValue="" onChange={(event) => setGender(event.target.value)}>
                            <option value="" disabled>Select…</option>
                            {
                                Object.values(Gender).map((g) => (
                                     <option value={g} key={g} >{g} </option>
                                ))
                            }
                        </select>
                        {errors.gender && <span className="pi-error">{errors.gender}</span>}
                    </div>

                    <fieldset className="pi-field pi-full pi-radio-group">
                        <legend>Marital status</legend>
                        <label className="pi-radio">
                            <input type="radio" name="marital" value="single" onChange={(event) => setIsMarried(false)} /> Single
                        </label>
                        <label className="pi-radio">
                            <input type="radio" name="marital" value="married" onChange={(event) => setIsMarried(true)}/> Married
                        </label>
                    </fieldset>

                    <div className="pi-field pi-full">
                        <label htmlFor="address">Address</label>
                        <input id="address" type="text" placeholder="No. 12, Main Street" onChange={(event) => setAddress(event.target.value)} value={address || ""}/>
                        {errors.address && <span className="pi-error">{errors.address}</span>}
                    </div>

                    <div className="pi-field">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" placeholder="Yangon" onChange={(event) => setCity(event.target.value)} value={city || ""} />
                        {errors.city && <span className="pi-error">{errors.city}</span>}
                    </div>
                    <div className="pi-field">
                        <label htmlFor="country">Country</label>
                        <input id="country" type="text" placeholder="Myanmar" onChange={(event) => setCountry(event.target.value)} value={country || ""}/>
                        {errors.country && <span className="pi-error">{errors.country}</span>}
                    </div>

                    <div className="pi-field pi-full">
                        <label htmlFor="bio">Short bio</label>
                        <textarea id="bio" rows={4} placeholder="Tell us a little about yourself…" onChange={(event) => setShortBio(event.target.value)} value={shortBio || ""}/>
                        {errors.shortBio && <span className="pi-error">{errors.shortBio}</span>}
                    </div>
                </div>

                <div className="pi-actions">
                    <button type="reset" className="pi-btn pi-btn-ghost">Reset</button>
                    <button type="submit" className="pi-btn pi-btn-primary">Save</button>
                </div>
            </form>

    )
}
