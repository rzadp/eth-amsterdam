import { PositionStats } from "types/Position";

export class PositionsStore {
  readonly WATCHED_NUMBER = 10;
  private topWatched: PositionStats[];
  private trackedPositions: { [id: string]: PositionStats };

  constructor() {
    this.topWatched = [];
    this.trackedPositions = {};
  }

  getTopWatched(): PositionStats[] {
    return this.topWatched;
  }

  addOrUpdatePosition(position: PositionStats) {
    console.log(position);
    this.trackedPositions[position.id] = position;

    this.updateTopWatched(position);
  }

  private updateTopWatched(position: PositionStats) {
    //   this.topWatched.filter
    if (this.topWatched.length > this.WATCHED_NUMBER) {
      this.topWatched.pop();
    }

    this.topWatched.push(position);
    this.topWatched.sort(comparePositions);
  }
}

const comparePositions = (pos1: PositionStats, pos2: PositionStats) => {
  return pos1.marginAbs - pos2.marginAbs;
};
