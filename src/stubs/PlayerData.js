export const PlayerData = {
  x: 0,
  y: 0,
  currentLocation: null,

  setCurrentLocation({ x, y, id }) {
    if (id === this.currentLocation) {
      console.info("Already at that location.");
      return;
    }

    console.log("Setting players location:", x, y, id);

    this.x = x;
    this.y = y;
    this.currentLocation = id;
  },

  getCurrentLocation() {
    return {
      id: this.currentLocation,
      x: this.x,
      y: this.y
    };
  }
};
