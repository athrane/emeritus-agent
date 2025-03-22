// Pattern for breaking curcular dependencies: https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de

export { State } from './State.js';
export { SleepingState } from './SleepingState.js';
export { EatingState } from './EatingState.js';
export { WalkingState } from './WalkingState.js';
export { NonPlayerCharacter } from './NonPlayerCharacter.js';

