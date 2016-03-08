export interface User {
  id: number;
  email: string;
  displayname: string;
  settings?: {
    interntaional: string[],
    national: string[],
    state: string[],
    city: string[],
    sub_city: string[]
  }
}