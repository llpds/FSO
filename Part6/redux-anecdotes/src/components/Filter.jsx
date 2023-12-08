import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter  <input
                id="filterInput"
                onChange={handleChange}
              />
    </div>
  )
}

export default Filter