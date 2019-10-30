import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onFindPetsClick = () => {
    console.log('state of animal', this.state.filters.type)
    let url = '/api/pets'
    console.log('url', url)
    let filteredPets
    if (this.state.filters.type == 'cat') {
      filteredPets = '?type=cat'
    } else if (this.state.filters.type == 'dog') {
      filteredPets = '?type=dog'
    } else if (this.state.filters.type == 'micropig') {
      filteredPets = '?type=micropig'
    } else {
      filteredPets = ''

    }
    console.log('filtered url', url+filteredPets)
    url = url + filteredPets
    console.log('newurl', url)
    fetch(url)
      .then(resp => resp.json())
      .then(petsData => {
          this.setState({pets: petsData}, console.log(this.state.pets))
        })
  }


  onChangeType = (event) => {
    const newFilter = event.target.value
    this.setState({filters: { type: newFilter } })
    // console.log(this.state.filters.type)
  }

  onAdoptPet = (petId) => {
    console.log(petId)
    const pets = this.state.pets.map(pet => {
      return pet.id == petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets })
  }

  render() {
    console.log(this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
            <PetBrowser allPets={this.state.pets} onAdoptPet={this.onAdoptPet} />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
