import RecentEntries from '../components/RecentEntries'
import Stats from '../components/Stats'
import Watchlist from '../components/Watchlist'
import '../css/Profile.css'
import {useState, useEffect} from 'react'



export default function Profile() {
const [name, setName] = useState('')
const [bio, setBio] = useState('')
const [profilePic, setProfilePic] = useState('')

const [editingName, setIsEditingName] = useState(false)
const [editingBio, setIsEditingBio] = useState(false)
const [editingPic, setIsEditingPic] = useState(false)

  useEffect(() => {
    const savedPic = localStorage.getItem('profilePic')
    if (savedPic) setProfilePic(savedPic)

    const savedName = localStorage.getItem('name')
    if (savedName) setName(savedName)

    const savedBio = localStorage.getItem('bio')
    if (savedBio) setBio(savedBio)
  }, [])


const handleName = () => 
{
    if (editingName == false)
    {
        setIsEditingName(true)
    }
    else {
        setIsEditingName(false)
    }
}


  return (
    <div className="profile">
      <div className="profile-paper">
        <input
            type = "file"
            id = "picInput"
            style = {{display: 'none'}}
            onChange = {(e) => {
                const file = e.target.files[0]
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    setProfilePic(reader.result)
                }
                localStorage.setItem('profilePic', reader.result)
            }}
        />

<div className = "profile-grid">
    <div className = "profile-left">
        <div className = "profile-picture" onClick = {() => document.getElementById('picInput').click()}>
            {profilePic ? <img src = {profilePic} /> : <p>add photo</p>}
        </div>
        <RecentEntries />
    </div>
    <div className = "profile-right">
        <div className = "profile-info">
            <div className = "profile-name">
                    {editingName ? (
                    <input
                        type="text" 
                        value = {name}
                        size = {name.length || 10}
                        onChange = {(e) => setName(e.target.value)}
                        onBlur = {() => {
                            handleName()
                            localStorage.setItem('name', name)
                        }}
                        onKeyDown = {(e) => {
                            if (e.key === 'Enter') setIsEditingName(false)
                        }}
                        autoFocus
                    />
                    ) : (
                        <p onClick = {handleName}>{name || 'click to add name'}</p>
                    )}
                </div>

            <div className = "profile-bio">
                {editingBio ? (
                    <textarea
                        value = {bio}
                        onChange = {(e) => setBio(e.target.value)}
                        onBlur = {() => {
                        setIsEditingBio(false)
                            localStorage.setItem('bio', bio)
                        }}
                        onKeyDown = {(e) => {
                        if (e.key === 'Enter') setIsEditingBio(false)
                        }}
                        autoFocus
                    />
                ) : (
                    <p onClick = {() => setIsEditingBio(true)}>{bio || 'click to add bio'}</p>
                )}
            </div>
        </div>
        <Stats />
        <Watchlist />
    </div>
</div>
</div>
</div>
  )
}