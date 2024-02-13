export interface IBoardProps {
  id: string;
  name: string;
  numberOfPeople: number;
  image?: string;
  description?: string;
  Streak?: Array<IStreak>;
  created_at: string;
  updated_at: string;
  userId: string;
}
export interface IStreak {
  id: string;
  created_at: Date;
  updated_at: Date;
  userId: string;
  boardId: string;
  current_streak: Number;
  User: IUser;
}
export interface IUser {
  id: string;
  image?: string;
  date_joined: string;
  name: string;
  current_streak?: Number;
}
