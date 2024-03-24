import {EActivityType} from "./EActivityType";

export type IActivitySearch = [
  IActivity[],
  number,
]

export interface IActivity {
  id: string;
  title: string;
  state: string;
  type: EActivityType;
  text: string;
  jobUrl: string;
  rateHour: number;
  salary: string;
  keywords: string[];
  position: string;
  location: string;
  employment: string;
  createdAt: Date,
  updatedAt: Date,
  cancelledAt: Date,
  user: any
}
