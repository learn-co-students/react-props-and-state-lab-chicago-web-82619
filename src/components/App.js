import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (newType) => {
    this.setState((prevState) => ({
      ...prevState,
      filters: {
        type: newType,
      },
    }));
  };

  onFindPetsClick = async () => {
    let data;
    let pets;
    if (this.state.filters.type === "all") {
      data = await fetch("/api/pets");
    } else {
      data = await fetch(`/api/pets?type=${this.state.filters.type}`);
    }

    pets = await data.json();

    this.setState((prevState) => ({
      ...prevState,
      pets: pets,
    }));
  };

  onAdoptPet = (id) => {
    console.log(id);
    const pets = this.state.pets.map((pet) => {
      return pet.id === id ? { ...pet, isAdopted: true } : pet;
    });

    this.setState((prevState) => ({
      ...prevState,
      pets: pets,
    }));
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
                filter={this.state.filters}
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
