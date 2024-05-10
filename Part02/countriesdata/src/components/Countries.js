import ShowCountry from './elements/ShowCountry'
import ShowInfo from './elements/ShowInfo'

const Countries = ({countries, filter, setFilter}) => {
  
    if(filter[0] && filter[0] === 'matched'){
      const filtered = countries.find(c => c.name.common === filter[1])
      return ( <ShowInfo country = {filtered}/> )
    } 

    const filtered = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))

    if(filtered.length === 0) return <p key="noMatches">No matches, specify another filter</p>
    if(filtered.length > 10) return <p key="manyMatches">Too many matches, specify another filter</p>
    if(filtered.length === 1) return ( <ShowInfo country = {filtered[0]}/> )    

    return(
      <table>
        <tbody>
          {filtered.map((country, index) => <ShowCountry  key = {country.name.common} 
                                                          country = {country}
                                                          setFilter={setFilter} 
                                                          index = {index + 1}/>)}
        </tbody>
      </table>
    )
  }

  export default Countries