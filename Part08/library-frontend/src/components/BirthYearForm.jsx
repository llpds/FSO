import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { PropTypes } from 'prop-types'
import { EDIT_BIRTH_YEAR } from '../queries'

import Select from 'react-select'
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
      setErr('author not found')
    }
  }, [result.data])


  return (
    <div>
      <h2>Set birth year </h2>
      <Notify errorMessage = {err}/>

      <form onSubmit={submit}>

        <Select
          defaultValue={nameOpt}
          onChange={setNameOpt}
          options={options}
        />
        <div>
          birth year <input
            id="inputAuthorBorn"
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