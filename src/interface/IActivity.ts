export type IActivityCollection = [
  IActivity[],
  number,
]

export interface IActivity {
  id: string;
  title: string;
  text: string;
  jobUrl: string;
  salary: string;
  position: string;
  createdAt: Date,
  updatedAt: Date,
  cancelledAt: Date,
}
