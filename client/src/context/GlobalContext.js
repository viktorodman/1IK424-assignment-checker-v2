import React, { useState, createContext } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = (props) => {
  const [currentURL, setURL] = useState('')
  const [urlToCheck, setUrlToCheck] = useState('')

  return (
    <GlobalContext.Provider
      value={{ currentURL, setURL, urlToCheck, setUrlToCheck }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
