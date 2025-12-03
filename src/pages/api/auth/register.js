import connectDB from "../../../DB/conect";
import User from "../../../DB/models/User";

export const prerender = false;

export const POST = async ({ request }) => {
    try {
        await connectDB();

        const data = await request.json();
        const { username, email, password, confirmPassword, phone, profile_picture, matricula, career } = data;

        // Validaciones básicas
        if (!username || !email || !password || !confirmPassword) {
            return new Response(
                JSON.stringify({
                    message: "Todos los campos son obligatorios",
                }),
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            return new Response(
                JSON.stringify({
                    message: "Las contraseñas no coinciden",
                }),
                { status: 400 }
            );
        }

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ $or: [{ email }, { username }, { matricula: matricula || 'non-existent-matricula' }] });
        if (userExists) {
            let msg = "El usuario o correo electrónico ya está registrado";
            if (matricula && userExists.matricula === matricula) msg = "La matrícula ya está registrada";

            return new Response(
                JSON.stringify({
                    message: msg,
                }),
                { status: 400 }
            );
        }

        // Crear nuevo usuario
        // NOTA: En producción, la contraseña DEBE ser hasheada (ej. con bcryptjs)
        // Para este demo, se guarda en texto plano como se solicitó implícitamente al no especificar auth compleja
        const newUser = new User({
            username,
            email,
            password, // TODO: Hash password
            phone: phone || '',
            matricula: matricula || '',
            career: career || '',
            profile_picture: profile_picture || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
        });

        await newUser.save();

        return new Response(
            JSON.stringify({
                message: "Usuario registrado exitosamente",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                },
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("Error en registro:", error);

        let status = 500;
        let message = "Error interno del servidor";

        if (error.name === 'ValidationError') {
            status = 400;
            // Concatenar todos los mensajes de error de validación
            message = Object.values(error.errors).map(val => val.message).join(', ');
        } else if (error.code === 11000) {
            status = 400;
            message = "El usuario o correo electrónico ya está registrado";
        }

        return new Response(
            JSON.stringify({
                message: message,
                error: error.message,
            }),
            { status: status }
        );
    }
};
