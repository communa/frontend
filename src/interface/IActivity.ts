export type IActivitySearch = [
  IActivity[],
  number,
]

export interface IActivity {
  id: string;
  title: string;
  text: string;
  jobUrl: string;
  salary: string;
  keywords: string[];
  position: string;
  location: string;
  employment: string;
  createdAt: Date,
  updatedAt: Date,
  cancelledAt: Date,
}
