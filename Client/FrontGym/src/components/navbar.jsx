export function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 border-b border-neutral-300  mb-4">
            <div className="flex items-center">
                <img src="./images/images.jfif" alt="Logo" className="h-10 mr-4 rounded-full" />
                <span className="text-xl font-bold">ADN SPORT TOCOPILLA</span>
            </div>
            <ul className="flex space-x-4">
                <li>
                    <a href="/panel" className="hover:underline">Panel</a>
                </li>
                <li>
                    <a href="/miembros" className="hover:underline">Miembros</a>
                </li>
                <li>
                    <a href="/empleados" className="hover:underline">Empleados</a>
                </li>
            </ul>
        </nav>
    );
}