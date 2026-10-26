import './App.css'
import './PersonalInfo.css'
import { PersonalInfoForm } from './PersonalInfoForm'
import { PersonList } from './PersonList'
import { PersonProvider } from './PersonContext'

function App() {

  return (
    <PersonProvider>
      <main className="pi-layout">

        <PersonalInfoForm />
        <PersonList />

      </main>
    </PersonProvider>
  )
}

export default App
