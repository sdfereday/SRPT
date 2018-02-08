import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { distanceApprox } from '../helpers/Helpers';

//// TODO: Fix the problem with the relative import urls
// Also find a nicer way to store volatile data, these aren't great.
import { LOCATIONS } from "../stubs/MapData";
import { PlayerData } from "../stubs/PlayerData";

class GameState {

  get data() {
    return this.params;
  }

  get current() {
    return this.coordinates;
  }

  get to()
  {
    return this.destination;
  }

  init(params) {
    console.log("State change params:", params);
    this.params = params;
    this.coordinates = { x: 0, y: 0 };
  }

  preload() {}

  create() {
    console.log("Warp state loaded.");
    console.log(this.params);

    this.destination = LOCATIONS.find(loc => loc.id === this.params.nextLocationId);

    const { x, y } = PlayerData.getCurrentLocation();
    this.setCoordinates(x, y);

    console.log(this.coordinates, this.destination);
  }

  update() {

    // Not overly immutable, might want to fix that somehow. In fact,
    // may want to just pass in what you want to affect such is functional.
    let mx = this.current.x > this.to.x ? -1 : 1;
    let my = this.current.y > this.to.y ? -1 : 1;
    this.setCoordinates(this.current.x + mx, this.current.y + my);

    console.log(distanceApprox(this.current, this.to));

    // Exposing this publically will allow the UI, etc to use it for something.
    if (distanceApprox(this.current, this.to) <= 0) {
      // events.trigger('onArrived', this.data.p2);
      PlayerData.setCurrentLocation(this.to);
      this.state.start("FieldState", false, false);
    } else {
        console.log("Travelling...");
    }

  }

  setCoordinates(x, y) {
    this.coordinates.x = x;
    this.coordinates.y = y;
  }

}

export default GameState;
