import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Define las opciones de posición fuera del componente para reutilizarlas
const POSITION_CHOICES = [
  { value: 'Jefe', label: 'Jefe' },
  { value: 'Recepcionista', label: 'Recepcionista' },
  { value: 'Entrenador', label: 'Entrenador' },
  { value: 'Limpieza', label: 'Limpieza' },
  { value: 'Empleado Común', label: 'Empleado Común' },
];

export function Modal({ showModal, setShowModal, type, members, setMembers, employees, setEmployees, editEntity, setEditEntity }) {
  const isMember = type === "member";

  const initialFormState = {
    name: "",
    phone: "",
    gender: "M",
    ...(isMember ? { membership_type: "Basico", membership_status: "Activo" } : { position: "Jefe" })
  };

  const [newEntity, setNewEntity] = useState(initialFormState);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editEntity) {
      setNewEntity(editEntity);
    }
  }, [editEntity]);

  const handleChange = (e) => {
    setNewEntity({ ...newEntity, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newEntity.name || !newEntity.phone) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const url = `http://127.0.0.1:8000/${isMember ? "members" : "employees"}/${editEntity ? `${editEntity.id}/` : ''}`;
    const axiosMethod = editEntity ? axios.put : axios.post;

    axiosMethod(url, newEntity)
      .then((response) => {
        if (isMember) {
          if (editEntity) {
            setMembers(members.map(member => member.id === response.data.id ? response.data : member));
          } else {
            setMembers([...members, response.data]);
          }
        } else {
          if (editEntity) {
            setEmployees(employees.map(employee => employee.id === response.data.id ? response.data : employee));
          } else {
            setEmployees([...employees, response.data]);
          }
        }
        setShowModal(false);
        setError("");
        setEditEntity(null); // Limpiar la entidad en edición
        setNewEntity(initialFormState); // Restablecer el formulario
      })
      .catch((error) => {
        console.error(`Error al ${editEntity ? "editar" : "añadir"} ${isMember ? "miembro" : "empleado"}:`, error);
        setError(`Ocurrió un error al intentar ${editEntity ? "editar el" : "añadir el"} ${isMember ? "miembro" : "empleado"}.`);
      });
  };

  const handleClose = () => {
    setShowModal(false);
    setError("");
    setNewEntity(initialFormState); // Limpia el formulario al cerrar el modal
    setEditEntity(null); // Limpiar la entidad en edición
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        className="bg-white p-4 rounded-md shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-4xl font-bold mb-4">{editEntity ? `Editar` : `Añadir`} {isMember ? "miembro" : "empleado"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={newEntity.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="bg-gray-100 border rounded-md px-3 py-2 text-sm mb-2 w-full"
          />
          <input
            name="phone"
            value={newEntity.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="bg-gray-100 border rounded-md px-3 py-2 text-sm mb-2 w-full"
          />
          <select
            name="gender"
            value={newEntity.gender}
            onChange={handleChange}
            className="bg-gray-100 border rounded-md px-3 py-2 text-sm mb-2 w-full"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {isMember ? (
            <>
              <select
                name="membership_type"
                value={newEntity.membership_type}
                onChange={handleChange}
                className="bg-gray-100 border rounded-md px-3 py-2 text-sm mb-2 w-full"
              >
                <option value="Basico">Básico</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
              <select
                name="membership_status"
                value={newEntity.membership_status}
                onChange={handleChange}
                className="bg-gray-100 border rounded-md px-3 py-2 text-sm mb-2 w-full"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
                <option value="Suspendido">Suspendido</option>
              </select>
            </>
          ) : (
            <select
              name="position"
              value={newEntity.position}
              onChange={handleChange}
              className="bg-gray-100 border rounded-md px-3 py-2 text-sm mb-2 w-full"
            >
              {POSITION_CHOICES.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          )}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-gray-300 text-sm text-gray-800 font-bold px-3 py-2 rounded mr-2"
              onClick={handleClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-neutral-900 text-sm hover:bg-neutral-700 text-white font-bold px-3 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["member", "employee"]).isRequired,
  members: PropTypes.array,
  setMembers: PropTypes.func,
  employees: PropTypes.array,
  setEmployees: PropTypes.func,
  editEntity: PropTypes.object,
  setEditEntity: PropTypes.func,
};
