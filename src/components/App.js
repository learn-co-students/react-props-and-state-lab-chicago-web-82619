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

  onChangeType = (event) => {
    let animal = event.target.value;
    let filters = {...this.state.filters, type: animal}
    this.setState({filters})
  }

  onFindPetsClick = (event) => {
    let type = this.state.filters.type;
    const PETS_URL = '/api/pets'
    if(type == 'all'){
      fetch(PETS_URL)
      .then(res => res.json())
      .then(pets => {
        this.setState({pets});
      })
    } else {
      let query = `?type=${type}`;
      fetch(`${PETS_URL}${query}`)
      .then(res => res.json())
      .then(pets => {
        this.setState({pets});
      })
    }
  }

  onAdoptPet = petId => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({pets});
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
