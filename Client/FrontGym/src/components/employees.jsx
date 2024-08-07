import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import SearchIcon from "../components/Icons";
import { CiTrash } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Modal } from "../components/modal";

export function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editEntity, setEditEntity] = useState(null); // Estado para la edición de empleados

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/employees/")
      .then((response) => {
        setEmployees(response.data.Employees); // Asegúrate de que este sea el formato correcto
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const deleteEmployee = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/employees/${id}/`)
      .then(() => {
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el empleado:", error);
      });
  };

  const editEmployee = (id) => {
    const employee = employees.find((e) => e.id === id);
    setEditEntity(employee);
    setShowModal(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center">
        <div>
          <h1 className="text-2xl text-left font-bold">Gestión de empleados</h1>
          <h4 className="text-left text-gray-500 mb-4">
            Ver y administrar los empleados del gimnasio
          </h4>
          <div className="flex items-center gap-2 mb-4">
            <input
              placeholder="Buscar empleados..."
              className="bg-gray-100 border rounded-md px-3 py-2 text-sm"
            />
            <button className="border rounded-md px-3 py-2 text-sm">
              <SearchIcon />
            </button>
            <button
              className="bg-neutral-900 text-sm hover:bg-neutral-700 text-white font-bold px-3 py-2 rounded"
              onClick={() => { setShowModal(true); setEditEntity(null); }}
            >
              Añadir empleado
            </button>
          </div>
          <Modal
            showModal={showModal}
            setShowModal={setShowModal}
            type="employee"
            employees={employees}
            setEmployees={setEmployees}
            editEntity={editEntity} // Pasa el empleado a editar al Modal
            setEditEntity={setEditEntity} // Función para limpiar el estado de edición
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Nombre
              </th>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Teléfono
              </th>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Género
              </th>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Cargo
              </th>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                <td className="py-4 px-6 text-sm text-gray-900">
                  {employee.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {employee.phone}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {employee.gender}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="inline-block py-1 px-3 rounded-full text-neutral-800 border border-neutral-300 font-bold">
                    {employee.position}
                  </span>
                </td>
                <td className="flex justify-center items-center gap-1 py-6">
                  <button onClick={() => editEmployee(employee.id)}>
                    <HiOutlinePencilSquare className="h-7 w-7 p-1 rounded-md border border-neutral-300" />
                  </button>
                  <button onClick={() => deleteEmployee(employee.id)}>
                    <CiTrash className="h-7 w-7 p-1 rounded-md border border-neutral-300" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
