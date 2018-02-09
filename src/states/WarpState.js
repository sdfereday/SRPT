import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { distanceApprox } from '../helpers/Helpers';

//// TODO: Fix the problem with the relative import urls
// Also find a nicer way to store volatile data, these aren't great.
import { LOCATIONS } from "../stubs/MapData";
import { PlayerData } from "../stubs/PlayerData";
import { UniverseStore } from "../stubs/UniverseData";

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

  create() {
    console.log("Warp state loaded.");
    console.log(this.params);

    this.destination = LOCATIONS.find(loc => loc.id === this.params.nextLocationId);

    const { x, y } = PlayerData.getCurrentLocation();
    this.setCoordinates(x, y);

    console.log(this.coordinates, this.destination);

    this.tilesprite = this.game.add.tileSprite(0, -56, 512, 512, 'warp');
    this.tilesprite.animations.add('run');
    this.tilesprite.animations.play('run', 20, true);
  }

  update() {

    // Not overly immutable, might want to fix that somehow. In fact,
    // may want to just pass in what you want to affect such is functional.
    let mx = this.current.x > this.to.x ? -1 : 1;
    let my = this.current.y > this.to.y ? -1 : 1;
    this.setCoordinates(this.current.x + mx, this.current.y + my);

    const distance = distanceApprox(this.current, this.to);

    // Exposing this publically will allow the UI, etc to use it for something.
    if (distance <= 0) {
      // events.trigger('onArrived', this.data.p2);
      PlayerData.setCurrentLocation(this.to);
      //UniverseData.set('distanceToDestination', 0);
      console.log("Warp field deactivating, approaching", this.to.meta.name);
      this.state.start("FieldState", false, false);
    } else {
        console.log("Travelling...");
        UniverseStore.dispatch({ type: 'setDistance', distance });
    }

  }

  shutdown() {
    this.tilesprite.destroy();
  }

  setCoordinates(x, y) {
    this.coordinates.x = x;
    this.coordinates.y = y;
  }

}

export default GameState;
