export type IActivityCollection = [
  IActivity[],
  number,
]

export interface IActivity {
  id: string;
  title: string;
  text: string;
}
