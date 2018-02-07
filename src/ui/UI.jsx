import { compose, withState, withHandlers, lifecycle } from 'recompose';
import React from 'react';

const AppComponent = ({
	locations,
  nextLocationId,
  currentLocationId,
  onHandleChange,
  onTravelRequest
}) => {
	return (
  [
    <select onChange={onHandleChange}>
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
    <button onClick={onTravelRequest} disabled={nextLocationId === currentLocationId}>
      Travel
    </button>
    ]
  )
}

export const AppContainer = compose(
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
    onTravelRequest: ({ nextLocationId, setCurrentLocationId, setNextLocationId }) => () => {
    	console.log("Travel request to", nextLocationId);
      setCurrentLocationId(nextLocationId);
      events.trigger('onTravelRequest', {nextLocationId});
    }
  }),
  lifecycle({
  	componentDidMount(){
    	console.log("Mounted UI");
    }
	})
)
(AppComponent);