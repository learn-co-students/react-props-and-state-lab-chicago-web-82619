import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props.allPets)
  }
  render() {
    const allPets = this.props.allPets.map(petInfo => {
      return <Pet key={petInfo.id} pet={petInfo} onAdoptPet={this.props.onAdoptPet} />
    })

    console.log(allPets)

    return (
      <div className="ui cards">
        {allPets}
      </div>
    )
  }
}

export default PetBrowser
