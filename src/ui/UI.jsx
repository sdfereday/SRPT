import { compose, withState, withHandlers, withProps, lifecycle } from 'recompose';
import React from 'react';
import { connect } from 'react-redux';
import events from '../events/EventManager';
import { UniverseStore } from "../stubs/UniverseData";

const AppComponent = ({
	locations,
  nextLocationId,
  currentLocationId,
  distance,
  onHandleChange,
  onTravelRequest
}) => {
	return (
  [
    <select onChange={onHandleChange} key='destinationSelection'>
      {locations && locations.length &&
        locations.map(({id, meta: { name }}) => {
        return (
          <option key={id} value={id}>
            {name}
          </option>
        );
      })
      }
    </select>,
    <button onClick={onTravelRequest} disabled={nextLocationId === currentLocationId} key='destinationButton'>
      Travel
    </button>,
    <div style={{color: '#fff'}} key='destinationDistance'>
      Distance To Destination:
      {distance}
    </div>
    ]
  )
}

// Do I really need to use redux AND recompose? They're both the same idea.
export const AppContainer = compose(
  withProps({
    store: UniverseStore,
    distance: 0
  }),
  connect(
    ({ distance }) => {
      console.log(distance);
      return { distance }
    }
  ),
  withState('currentLocationId', 'setCurrentLocationId', null),
  withState('nextLocationId', 'setNextLocationId', null),
	withHandlers({
  	onHandleChange: ({ currentLocationId, setNextLocationId }) => (e) => {
	    const nextLocation = e.target.value;
      if(nextLocation !== currentLocationId) {
      	setNextLocationId(nextLocation);
        console.log("New location set to:", nextLocation);
      }
    },
    onTravelRequest: ({ nextLocationId, setCurrentLocationId, setNextLocationId, distance }) => () => {
      console.log(distance);
    	console.log("Travel request to", nextLocationId);
      setCurrentLocationId(nextLocationId);
      events.emit('onTravelRequest', { nextLocationId });
    }
  }),
  lifecycle({
  	componentDidMount(){
    	console.log("Mounted UI");
    }
	})
)
(AppComponent);
