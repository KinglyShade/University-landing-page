import connectDB from "../../../DB/conect";
import User from "../../../DB/models/User";

export const prerender = false;

export const POST = async ({ request }) => {
    try {
        await connectDB();

        const data = await request.json();
        const { username, password } = data;

        if (!username || !password) {
            return new Response(
                JSON.stringify({
                    message: "Usuario y contraseña son requeridos",
                }),
                { status: 400 }
            );
        }

        // Buscar usuario por nombre de usuario
        const user = await User.findOne({ username });

        if (!user) {
            return new Response(
                JSON.stringify({
                    message: "Credenciales inválidas",
                }),
                { status: 401 }
            );
        }

        // Verificar contraseña (texto plano por ahora)
        if (user.password !== password) {
            return new Response(
                JSON.stringify({
                    message: "Credenciales inválidas",
                }),
                { status: 401 }
            );
        }

        // Login exitoso
        return new Response(
            JSON.stringify({
                message: "Login exitoso",
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error en login:", error);
        return new Response(
            JSON.stringify({
                message: "Error interno del servidor",
                error: error.message,
            }),
            { status: 500 }
        );
    }
};
