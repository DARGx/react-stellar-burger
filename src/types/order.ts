export interface Order {
  _id: string;
  status: OrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
}

export enum OrderStatus {
  CREATED = 'created',
  PENDING = 'pending',
  DONE = 'done',
}
