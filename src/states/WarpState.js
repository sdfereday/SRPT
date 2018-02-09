import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { distanceApprox } from '../helpers/Helpers';
import events from '../events/EventManager';
import { setDistance } from "../stubs/UniverseData";

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

  get currentDistance()
  {
    return this.distance;
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

    // Fires a ticker event that'll pol the event system. This is only used where non-important
    // updates are made and it's known that continuous data is streaming in.
    //this.game.time.events.repeat(Phaser.Timer.SECOND / 2, 10, this.onWorldUpdate, this);
  }

  update() {
    // Not overly immutable, might want to fix that somehow. In fact,
    // may want to just pass in what you want to affect such is functional.
    let mx = this.current.x > this.to.x ? -1 : 1;
    let my = this.current.y > this.to.y ? -1 : 1;
    this.setCoordinates(this.current.x + mx, this.current.y + my);

    this.distance = distanceApprox(this.current, this.to);

    // Exposing this publically will allow the UI, etc to use it for something.
    if (this.distance <= 0) {
      events.emit('onArrived', {});
      // TODO: Add all of this stuff to a store, even the distance bits.
      PlayerData.setCurrentLocation(this.to); // Shouldn't need to be here anymore. Can read from though.
      console.log("Warp field deactivating, approaching", this.to.meta.name);
      this.state.start("FieldState", false, false);
    }

    // Unsure if this is expensive yet.
    this.onWorldUpdate();
  }

  shutdown() {
    this.tilesprite.destroy();
  }

  setCoordinates(x, y) {
    this.coordinates.x = x;
    this.coordinates.y = y;
  }

  onWorldUpdate() {
    setDistance(this.currentDistance);

    // events.emit('onWorldUpdate', {
    //   distanceRemaining: this.currentDistance
    // });
  }
}

export default GameState;
