import React from "react";

class Pet extends React.Component {
  render() {
    const { name, gender, isAdopted, age, type, weight, id } = this.props.pet;
    return (
      <div className="card">
        <div className="content">
          <a href={id} className="header">
            {gender === "female" ? "♀ " : "♂ "}
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
          {isAdopted ? (
            <button className="ui disabled button">Already adopted</button>
          ) : (
            <button
              onClick={() => this.props.onAdoptPet(id)}
              className="ui primary button"
            >
              Adopt pet
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Pet;

// age: 4
// gender: "male"
// id: "5c142d9e-ea45-4231-8146-cccf71c704c0"
// isAdopted: false
// name: "Trident"
// type: "dog"
// weight: 1
