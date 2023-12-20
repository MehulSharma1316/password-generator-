import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [password, setpassword] = useState("")
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [characters, setCharacters] = useState(false)
  const passwordRef = useRef(null)

  const passwordGenrator = useCallback(() => {
    let pass = ""
    
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(number) str += "0123456789"
    if(characters) str += "!@#$%^&*-_+=[]{}~`"

    for (let index = 1; index < length; index++) {
     let char = Math.floor(Math.random() * str.length + 1)
     pass += str.charAt(char)
      console.log("char", char)
    }
    setpassword(pass)
    console.log("pasword",password)
    console.log("pass",pass)
    
  }, [length, number, characters, setpassword])
  
  function copyHandler() {
    passwordRef.current?.select()
  
    passwordRef.current?.setSelectionRange(0, 100);
    navigator.clipboard.writeText(password)
  }
  
  useEffect(() => {
    
    passwordGenrator()
  },[length, number, characters,])

  return (
    <>
      <div className='bg-gray-900 flex h-screen'>
       <div className='w-full max-w-md max-h-32 mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
       <h1 className='text-white text-center my-3'>Password Genrator</h1>
       <div className='flex'>
        <input
        type='text'
        value={password}
        className='w-10/12 rounded-lg'
        ref={passwordRef}
        readOnly
        />
        <button className='bg-blue-700 text-white px-2 rounded-lg '
        onClick={copyHandler}>
          Copy
        </button>
       </div>
       
       <div>
        <input
        type='range'
        min={1}
        max={100}
        value={length}
        onChange={(e) => setLength(e.target.value)}
        />
        <label>Length {length}</label>

        <input
        type='checkbox'
        id='Number'
        onChange={() => {
          setNumber((prev) => !prev)
        }}
        />
        <label htmlFor='Number'>number</label>

        <input
        type='checkbox'
        id='Characters'
        onChange={() => {
          setCharacters((prev) => !prev)
        }}
        />
        <label htmlFor='Characters'>Characters</label>

        
       </div>
       </div>
      </div>
     
    </>
  )
}

export default App
