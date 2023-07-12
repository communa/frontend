export type IActivitySearch = [
  IActivity[],
  number,
]

export interface IActivity {
  id: string;
  title: string;
  state: string;
  text: string;
  jobUrl: string;
  rate: string;
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
