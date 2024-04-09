import { useEffect, useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { PropTypes } from 'prop-types'
import { EDIT_BIRTH_YEAR } from '../queries'
import Notify from './Notify'




const BirthYearForm = ({ authors }) => {
  const options = authors.map(a => ({ value: a.name, label: a.name }))
  const initOpt = options[0]
  const [nameOpt, setNameOpt] = useState(initOpt)
  const [born, setBorn] = useState('')
  const [err, setErr] = useState()

  const [ changeBorn, result ] = useMutation(EDIT_BIRTH_YEAR, {
    onError: (e) => {
      const msg = e.graphQLErrors.map(e => e.message).join('/n')
      setErr(msg)
    }
  })


  const submit = (event) => {
    event.preventDefault()

    const bornInt = Number(born)
    const name = nameOpt ? nameOpt.value : nameOpt
    changeBorn({ variables: { name, setBornTo: bornInt } })

    setBorn('')
    setErr(null)
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setErr('person not found')
    }
  }, [result.data]) 


  return (
    <div>
      <h2>Set birth year </h2>
      <Notify errorMessage = {err}/>

      <form onSubmit={submit}>
        {/* if need a textfield to check for non-existent author */}
        {/* <div>  
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        
        {/* 
            When use this template recall next: I’ve already tried several options,
            I couldn’t find any difference in the mechanics between react select and select tag,
            they react identically to the introduction of incorrect and empty fields.
            React select imposes restrictions on the shape of the state, or extra time...
            When the external design has been developed, the select tag is more preferable.
            Next time, use this: 
              <select value={} onChange={}>
                <option value="someOption">Some option</option>
                ...
              </select>
            or see part9 Patientor_front -> AddEntryForm -> Select (mui material) 
        */}
        <Select
          defaultValue={nameOpt}
          onChange={setNameOpt}
          options={options}
        />
        <div>
          birth year <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

BirthYearForm.propTypes = {
  authors: PropTypes.array
}

export default BirthYearForm