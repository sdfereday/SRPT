// DATA AREA
// Default location is anywhere that isn't found in locations list, and its coordinates can be generated
// when the ship has left warp. 0 is just a placeholder.
export const DEFAULT_LOCATION = {
  id: "unknown",
  x: 0,
  y: 0,
  meta: {
    name: "Unknown Quadrant"
  }
};

// Assume light years for now :P
export const LOCATIONS = [
  {
    id: "loc-1",
    x: 100,
    y: 2,
    meta: {
      name: "Erebus Terminal"
    }
  },
  {
    id: "loc-2",
    x: 1,
    y: 5,
    meta: {
      name: "Novis Alpha"
    }
  },
  {
    id: "loc-3",
    x: 200,
    y: 300,
    meta: {
      name: "Heliuos Prime"
    }
  }
];
