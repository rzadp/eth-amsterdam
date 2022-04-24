import { PositionStats } from "types/Position";

const NOTIFICATION_THRESHOLD = 50;

export class PositionsStore {
  readonly WATCHED_NUMBER = 10;
  private topWatched: PositionStats[];
  private trackedPositions: { [id: string]: PositionStats };

  constructor(private notify: (msg: string) => void) {
    this.topWatched = [];
    this.trackedPositions = {};
  }

  getTopWatched(): PositionStats[] {
    return this.topWatched;
  }

  addOrUpdatePosition(position: PositionStats) {
    this.trackedPositions[position.id] = position;

    if (
      this.topWatched.length < this.WATCHED_NUMBER ||
      comparePositions(this.topWatched[this.topWatched.length - 1], position) >
        0
    ) {
      this.updateTopWatched(position);
    }

    if (Object.keys(this.trackedPositions).length === NOTIFICATION_THRESHOLD) {
      this.notify("INITIAL 10 top watched - NOTIFICATION");
    }
  }

  private updateTopWatched(position: PositionStats) {
    const filtered = this.topWatched.filter(
      (watched) =>
        watched.id !== position.id || watched.marginAbs === position.marginAbs
    );
    if (
      this.topWatched.some((watched) => watched.id === position.id) &&
      filtered.length === this.topWatched.length
    ) {
      return;
    }

    this.topWatched = filtered;

    if (this.topWatched.length === this.WATCHED_NUMBER) {
      this.topWatched.pop();
      if (Object.keys(this.trackedPositions).length > NOTIFICATION_THRESHOLD) {
        this.notify("Popping top watched - NOTIFICATION");
      }
    }

    this.topWatched.push(position);
    this.topWatched.sort(comparePositions);
    if (Object.keys(this.trackedPositions).length > NOTIFICATION_THRESHOLD) {
      this.notify("New position in top watched - NOTIFICATION");
    }
  }
}

const comparePositions = (pos1: PositionStats, pos2: PositionStats) => {
  return pos1.marginAbs - pos2.marginAbs;
};
