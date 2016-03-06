export interface User {
  id: number;
  username: string;
  settings: {
    interntaional: string[],
    national: string[],
    state: string[],
    city: string[],
    sub_city: string[]
  }
}