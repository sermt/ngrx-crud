import Employee from '../model/employee.interface';

export default function employeeFromForm(form: Record<string, string>) {
  return {
    name: form['name'],
    role: form['role'],
    doj: new Date(form['doj']),
    salary: Number(form['salary']),
    id: Date.now(),
  } as Employee;
}
