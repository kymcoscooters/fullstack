import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-12336542'},
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const names = this.state.persons.map(name => name.name)

    if (names.includes(this.state.newName)) {
      alert('Nimi löytyy jo puhelinluettelosta!')
    } else {
      const personObj = {
        name: this.state.newName,
        number: this.state.newNumber
      }
  
      const persons = this.state.persons.concat(personObj)
  
      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value})
  }

  filterHandler = (event) => {
    this.setState({ filter: event.target.value})
  }

  Person = (props) => {
    const Show = () => <li>{props.person.name} {props.person.number}</li>

    return (
      <div>
        <Show />
      </div>
    )
  }

  Showlist = (props) => props.list.map((person) => <this.Person key={person.name} person={person} />)

  render() {
    const personsToShow = this.state.persons.filter(person => person.name.includes(this.state.filter))

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          rajaa näytettäviä<input
            value={this.state.filter}
            onChange={this.filterHandler}
          />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input 
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          <this.Showlist list={personsToShow}/>
        </ul>
      </div>
    )
  }
}

export default App