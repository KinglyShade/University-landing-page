import connectDB from "../../../DB/conect";
import User from "../../../DB/models/User";

export const prerender = false;

export const DELETE = async ({ request }) => {
    try {
        await connectDB();

        const data = await request.json();
        const { userId } = data;

        if (!userId) {
            return new Response(
                JSON.stringify({
                    message: "ID de usuario requerido",
                }),
                { status: 400 }
            );
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return new Response(
                JSON.stringify({
                    message: "Usuario no encontrado",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Cuenta eliminada exitosamente",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al eliminar cuenta:", error);
        return new Response(
            JSON.stringify({
                message: "Error interno del servidor",
                error: error.message,
            }),
            { status: 500 }
        );
    }
};
