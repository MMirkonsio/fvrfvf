import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import SearchIcon from "../components/Icons";
import { CiTrash } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { Modal } from "../components/modal"; // Importa el componente Modal

export function Members() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false); // Estado para el modal
  const [editEntity, setEditEntity] = useState(null); // Estado para la edición de miembros

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/members/")
      .then((response) => {
        setMembers(response.data.Members);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const deleteMember = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/members/${id}/`)
      .then(() => {
        setMembers((prevMembers) => prevMembers.filter((member) => member.id !== id));
      })
      .catch((error) => {
        console.error("Error al eliminar el miembro:", error);
      });
  };

  const editMember = (id) => {
    const member = members.find((m) => m.id === id);
    setEditEntity(member);
    setShowModal(true);
  };

  

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-left font-bold">Gestión de miembros</h1>
          <h4 className="text-left text-gray-500 mb-4">
            Ver y administrar los miembros del gimnasio
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          placeholder="Buscar miembros..."
          className="bg-gray-100 border rounded-md px-3 py-2 text-sm"
        />
        <button className="border rounded-md px-3 py-2 text-sm">
          <SearchIcon />
        </button>
        <button
          className="bg-neutral-900 text-sm hover:bg-neutral-700 text-white font-bold px-3 py-2 rounded"
          onClick={() => { setShowModal(true); setEditEntity(null); }}
        >
          Añadir miembro
        </button>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        type="member"
        members={members}
        setMembers={setMembers}
        editEntity={editEntity} // Pasa el miembro a editar al Modal
        setEditEntity={setEditEntity} // Función para limpiar el estado de edición
      />

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
                Estado de Membresía
              </th>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Tipo de Membresía
              </th>
              <th className="py-3 px-6 text-sm font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="py-4 px-6 text-sm text-gray-900">
                  {member.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {member.phone}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {member.gender}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {member.membership_status}
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="inline-block py-1 px-3 rounded-full text-neutral-800 border border-neutral-300 font-bold">
                    {member.membership_type}
                  </span>
                </td>
                <td className="flex justify-center items-center gap-1 py-6">
                  <button onClick={() => editMember(member.id)}>
                    <HiOutlinePencilSquare className="h-7 w-7 p-1 rounded-md border border-neutral-300" />
                  </button>
                  <button onClick={() => deleteMember(member.id)}>
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
