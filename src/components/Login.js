import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useViewContext } from "../context/ViewContext";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const LoginPage = () => {
    const { login } = useAuthContext();
    const [form, setForm] = useState({ userName: "", password: "" });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(true);
    const { setView } = useViewContext();

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${API_URL}/users/login`, form);

            if (isMounted) {
                login(response.data);
                console.log("Usuario autenticado correctamente.");
            }
        } catch (error) {
            if (isMounted) {
                setError(error.response?.data?.message || "Error al iniciar sesión");
            }
        } finally {
            if (isMounted) {
                setLoading(false)
                setView("list")
                ;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className="mt-10 flex flex-col items-center">
            <form
                onSubmit={handleSubmit}
                className="my-10 flex flex-col w-[750px] p-8 space-y-6 bg-white rounded-lg shadow-lg ring-1 ring-blue-300"
            >
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Inicio de Sesión</h2>

                {error && <p className="text-red-500">{error}</p>}

                <div>
                    <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">
                        Nombre de Usuario
                    </label>
                    <input
                        id="userName"
                        name="userName"
                        value={form.userName}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg font-semibold cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Iniciar Sesión"}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
