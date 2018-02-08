export const distance = (object, target) => {
  let a = object.x - target.x;
  let b = object.y - target.y;

  return Math.sqrt(a * a + b * b);
};

export const distanceApprox = (p1, p2) => {
  // https://gist.github.com/aurbano/4693462
  const x = p2.x - p1.x;
  const y = p2.y - p1.y;
  return (
    1.426776695 *
    Math.min(
      0.7071067812 * (Math.abs(x) + Math.abs(y)),
      Math.max(Math.abs(x), Math.abs(y))
    )
  );
};

// -> http://davidarvelo.com/blog/array-number-range-sequences-in-javascript-es6/
export const numberArray = (begin, end) => {
  let arr = [];
  for (let i = begin; i < end; i += 1) {
    arr.push(i);
  }
  return arr;
};

export const animDuration = (fps, frameNum) => {
  return fps * frameNum * 10;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export const getTargetDirection = (tx, ownerx) => {
  return tx > ownerx ? 1 : -1;
};

export const targetWithinBounds = (target, owner, range) => {
  // Checks if the current target is within a good enough 'x' zone to prevent left-right shift (might need 'y' in future)
  return target && (target.x > owner.x - range && target.x < owner.x + range);
};

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};
