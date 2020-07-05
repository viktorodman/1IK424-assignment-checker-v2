import React, { useState, createContext } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
  const [currentURL, setURL] = useState('')

  return (
    <GlobalContext.Provider value={{ currentURL, setURL }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
