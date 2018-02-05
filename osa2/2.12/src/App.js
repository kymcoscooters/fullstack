import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  filterHandler = (event) => {
    this.setState({ filter: event.target.value})
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data})
      })
  }

  Country = (props) => {
    const Show = () => <p>{props.country.name}</p>

    return (
      <div onClick={this.clickHandler()}>
        <Show />
      </div>
    )
  }

  Showcountries1 = (props) => props.list.map((country) => <this.Country key={country.name} country={country} />)

  clickHandler = () => {
    console.log('lol')
  }

  ShowCountries = () => {
    const countriesToShow = this.state.countries.filter(country => country.name.includes(this.state.filter))

    if (countriesToShow.length > 10) {
      return(<p>too many matches, specify another filter</p>)
    }

    if (countriesToShow.length > 1) {
      return (
        <div>
          {countriesToShow.map((country) => <this.Country key={country.name} country={country} />)}
        </div>
      )
    }
    
    if (countriesToShow.length === 0) {
      return (
        <div>
          <p>no countries match</p>
        </div>
      )
    }

    const country = countriesToShow[0]
    return (
      <div>
        <h2>{country.name} {country.nativeName}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} width="200"/>
      </div>
    )
  }

  render() {
    const countriesToShow = this.state.countries.filter(person => person.name.includes(this.state.filter))
    
    return (
      <div>
        find countries: <input
          value={this.state.filter}
          onChange={this.filterHandler}
        />
        <this.ShowCountries />
      </div>
    )
  }
}

export default App