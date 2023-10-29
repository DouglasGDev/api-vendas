export interface ICustomer { // tudo que for implementar em relação a cliente, tem que implementar essa interface
  id: string;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}
