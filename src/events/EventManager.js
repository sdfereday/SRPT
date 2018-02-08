// https://github.com/Olical/EventEmitter
import EventsHandler from "eventemitter";

class EventManager {
  constructor() {
    this.emitter = new EventsHandler();
  }
  on(name, cb) {
    this.emitter.addListener(name, cb);
  }
  emit(name, params = []) {
    this.emitter.emitEvent(name, [params]);
  }
}

export default new EventManager();
