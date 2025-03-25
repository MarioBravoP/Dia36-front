"use client";
import { useAuthContext } from "../context/AuthContext";
import { useViewContext } from "../context/ViewContext";

export default function Header() {
  const { setView } = useViewContext();
  const { user, logout } = useAuthContext()

  const handleLogout = () => {
    logout();
    setView("list");
  }

  return (
    <header className="flex p-1 bg-cyan-400 text-white sticky top-0 gap-[1rem] w-full justify-center items-center">
      <nav>
        <ul className="flex gap-4 text-2xl font-bold">
          {user ? (
            <>
              <li className="cursor-pointer" onClick={() => setView("list")}>Inicio</li>

              <li className="cursor-pointer" onClick={() => setView("inventory")}>Ver inventario</li>
              {user.user.isAdmin ?
                <>
                  <li className="cursor-pointer" onClick={() => setView("createBook")}>Crear Libro</li>
                  <li className="cursor-pointer" onClick={() => setView("userList")}>Usuarios</li>
                </>
              : <></> }
              <li className="cursor-pointer" onClick={() => handleLogout()}>Logout</li>

            </>
          ) : (
            <>
              <li className="cursor-pointer" onClick={() => setView("login")}>Login</li>
              <li className="cursor-pointer" onClick={() => setView("userCreate")}>Crear Usuario</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
