import React, { Component } from 'react';
import DestinationList from './DestinationList';
import AddDestination from './AddDestination';
import "./style.css"

class DestinationManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [
        {
          id: 1,
          name: 'Paris, France',
          description: 'The city of love and lights',
          reviews: [
            { id: 1, author: 'John', comment: 'Beautiful city!', rating: 5 },
            { id: 2, author: 'Sarah', comment: 'Great food!', rating: 4 }
          ]
        },
        {
          id: 2,
          name: 'Tokyo, Japan',
          description: 'Vibrant metropolis blending tradition and modernity',
          reviews: [
            { id: 1, author: 'Mike', comment: 'Amazing culture', rating: 5 }
          ]
        },
        {
          id: 4,
          name: 'tunis, sousse',
          description: 'sousse',
          reviews: [
            { id: 1, author: 'John', comment: 'Beautiful city!', rating: 5 },
            { id: 2, author: 'Sarah', comment: 'Great food!', rating: 4 }
          ]
        },
      ]
    };
  }

  addDestination = (newDestination) => {
    this.setState(prevState => ({
      destinations: [...prevState.destinations, {
        id: prevState.destinations.length + 1,
        name: newDestination.name,
        description: newDestination.description,
        reviews: []
      }]
    }));
  };

  addReview = (destinationId, newReview) => {
    this.setState(prevState => ({
      destinations: prevState.destinations.map(destination => {
        if (destination.id === destinationId) {
          return {
            ...destination,
            reviews: [...destination.reviews, {
              id: destination.reviews.length + 1,
              ...newReview
            }]
          };
        }
        return destination;
      })
    }));
  };

  render() {
    return (
      <>
        <header className="App-header">
          <h1>Travel Destination Reviews</h1>
        </header>
        <main>
          {/* <AddDestination onAddDestination={this.addDestination} /> */}
          <DestinationList 
            destinations={this.state.destinations} 
            onAddReview={this.addReview} 
          />
        </main>
      </>
    );
  }
}

export default DestinationManager;