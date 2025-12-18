import { useEffect, useState } from "react";
import { getEmployees, addEmployee, deleteEmployee } from "../services/api";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  const loadEmployees = () =>
    getEmployees().then(setEmployees);

  useEffect(() => {
    loadEmployees();
  }, []);

  const saveEmployee = async () => {
    await addEmployee({ name, role, salary });
    loadEmployees();
  };

  return (
    <div>
      <h2>Employee Management (ADMIN)</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Role" onChange={e => setRole(e.target.value)} />
      <input placeholder="Salary" onChange={e => setSalary(e.target.value)} />
      <button onClick={saveEmployee}>Add</button>

      <hr />

      {employees.map(e => (
        <div key={e.id}>
          {e.name} - {e.role} - ₹{e.salary}
          <button onClick={() => deleteEmployee(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Employees;
