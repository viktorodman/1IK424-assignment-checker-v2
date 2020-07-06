import React, { useState, createContext } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
  const [currentURL, setURL] = useState('')
  const [urlToCheck, setUrlToCheck] = useState('')
  const [elements, setElements] = useState({})
  const [allTestsPass, setAllTestsPass] = useState(false)

  return (
    <GlobalContext.Provider
      value={{
        currentURL,
        setURL,
        urlToCheck,
        setUrlToCheck,
        elements,
        setElements,
        allTestsPass,
        setAllTestsPass
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
