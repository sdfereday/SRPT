// https://github.com/ai/nanoevents
import EventsHandler from "nanoevents";

class EventManager {
  constructor() {
    this.emitter = new NanoEvents();
  }
  on() {
    return this.emitter.on.apply(this.events, arguments);
  }
  tick() {
    this.emitter.emit("tick");
  }
}

export default EventManager;
