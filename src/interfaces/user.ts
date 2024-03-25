export interface User {
  id: string;
  email: string;
  authId: string;
  name: string;
  lastName: string;
  phone: string;
  completeProfile: boolean;
  birthMonth: number;
  birthDay: number;
  createdAt: Date;
  updatedAt: Date;
  preference: Preference | null;
  role: string;
}

export interface Preference {
  id: string;
  toys: boolean;
  kitchen: boolean;
}
