import { IoLockClosedOutline } from "react-icons/io5";

export function Panel() {
  return (
    <div className="lg:grid lg:grid-cols-3  items-center lg:gap-4 sm:flex sm:flex-col sm:gap-4 md:gap-4 md:grid md:grid-cols-2">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
        <h5 className="mb-2 text-3xl text-left font-bold tracking-tight text-neutral-900">
          MIEMBROS TOTALES
        </h5>
        <p className="font-normal text-left text-gray-400">
          El número total de miembros registrados en el gimnasio
        </p>
        <p className="font-bold text-4xl text-left text-neutral-900">
          2344
        </p>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
        <h5 className="mb-2 text-3xl text-left font-bold tracking-tight text-neutral-900">
          MIEMBROS ACTIVOS
        </h5>
        <p className="font-normal text-left text-gray-400">
          El número de miembros que han estado activos en los últimos 30 días
        </p>
        <p className="font-bold text-4xl text-left text-neutral-900">
          2044
        </p>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
        <h5 className="mb-2 text-3xl text-left font-bold tracking-tight text-neutral-900">
          NUEVOS REGISTROS
        </h5>
        <p className="font-normal text-left text-gray-400">
          El número de nuevos miembros que se han registrado en los últimos 30
          días
        </p>
        <p className="font-bold text-4xl text-left text-neutral-900">
          20
        </p>
      </div>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
        <h5 className="mb-2 text-3xl text-left font-bold tracking-tight text-neutral-900">
          INGRESOS TOTALES
        </h5>
        <p className="font-normal text-left text-gray-400">
          Ingresos totales de miembros activos y sus respectivos planes
        </p>
        <a
          href="#"
          className="inline-flex items-center  px-3 py-2  font-medium text-center text-white bg-neutral-900 rounded-lg hover:bg-neutral-700"
        >
          Abrir
          <IoLockClosedOutline />
        </a>
      </div>
    </div>
  );
}
