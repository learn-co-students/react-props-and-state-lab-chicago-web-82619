import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  render() {
    const petCards = this.props.pets.map(pet => (
      <Pet pet={pet} key={pet.id} onAdoptPet={this.props.onAdoptPet} isAdopted={this.props.isAdopted}/>
    ));

    return <div className="ui cards">{petCards}</div>;
  }
}

export default PetBrowser
