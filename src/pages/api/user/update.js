import connectDB from "../../../DB/conect";
import User from "../../../DB/models/User";

export const prerender = false;

export const PUT = async ({ request }) => {
    try {
        await connectDB();

        const data = await request.json();
        const { userId, username, email, phone, profile_picture, matricula, career } = data;

        if (!userId) {
            return new Response(
                JSON.stringify({
                    message: "ID de usuario requerido",
                }),
                { status: 400 }
            );
        }

        // Verificar unicidad de username/email/matricula excluyendo al usuario actual
        const existingUser = await User.findOne({
            $and: [
                { _id: { $ne: userId } },
                { $or: [{ email }, { username }, { matricula: matricula || 'non-existent' }] }
            ]
        });

        if (existingUser) {
            let msg = "El usuario o correo ya está en uso por otra cuenta";
            if (matricula && existingUser.matricula === matricula) msg = "La matrícula ya está registrada en otra cuenta";

            return new Response(
                JSON.stringify({
                    message: msg,
                }),
                { status: 400 }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username,
                email,
                phone,
                profile_picture,
                matricula,
                career
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return new Response(
                JSON.stringify({
                    message: "Usuario no encontrado",
                }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Perfil actualizado exitosamente",
                user: {
                    id: updatedUser._id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    matricula: updatedUser.matricula,
                    career: updatedUser.career,
                    profile_picture: updatedUser.profile_picture
                },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        return new Response(
            JSON.stringify({
                message: "Error interno del servidor",
                error: error.message,
            }),
            { status: 500 }
        );
    }
};
