export default interface Employee {
  id: number;
  name: string;
  doj: Date;
  role: Role;
  salary: number;
}

export enum Role {
  SoftwareEngineer = 'Software Engineer',
  ProductManager = 'Product Manager',
  UXDesigner = 'UX Designer',
}
