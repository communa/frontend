import {IActivity} from "./IActivity";

export type ITimeSearch = [
  ITime[],
  number,
]

export interface ITime {
  id: string;
  note: string | null;
  keyboardKeys: number;
  mouseKeys: number;
  mouseDistance: number;
  fromAt: string;
  toAt: string;
  activity: IActivity,
}
