import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddEntry from './pages/AddEntry'
import Profile from './pages/Profile'
import PageFlip from './components/PageFlip'
import AllEntries from './pages/AllEntries'
import EntryDetails from './pages/EntryDetails'

export default function App() {
  return (
    <BrowserRouter>
      <PageFlip />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEntry />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/entries" element = {<AllEntries />}/>
        <Route path="/entry/:id" element = {<EntryDetails />}/>
      </Routes>
    </BrowserRouter>
  )
}