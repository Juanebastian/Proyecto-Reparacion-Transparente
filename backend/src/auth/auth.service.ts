import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/registro';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 🔐 Función: login
   *
   * Inicia sesión de un usuario validando sus credenciales y generando un token JWT.
   *
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Un objeto con el estado del inicio de sesión y, si es exitoso, el token de acceso.
   */
  async login(email: string, password: string) {
    try {
      // 🔍 Buscar el usuario en la base de datos por su correo electrónico
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        return {
          success: false,
          message: 'Correo o contraseña incorrectos',
          statusCode: 401,
        };
      }

      // 🔑 Verificar si la contraseña ingresada coincide con la almacenada
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Correo o contraseña incorrectos',
          statusCode: 401,
        };
      }

      // 🔐 Generar un token JWT con los datos básicos del usuario
      const payload = { username: user.email, sub: user._id };
      const token = this.jwtService.sign(payload);

      // 📤 Retornar el token y la información básica del usuario autenticado
      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        statusCode: 200,
        data: {
          access_token: token,
          usuario: {
            id: user._id,
            nombreUsuario: user.nombre,
            email: user.email,
            rol: user.rol,
          },
        },
      };
    } catch (error) {
      // ⚠️ Manejo de errores en caso de fallos inesperados
      return {
        success: false,
        message: 'Error en el inicio de sesión',
        statusCode: 500,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      };
    }
  } // 🔚 Fin de la función login

  /**
   * 📝 Función: register
   *
   * Registra un nuevo usuario en la base de datos.
   *
   * @param registerDto - Datos del usuario a registrar.
   * @returns Un objeto con el estado del registro y los datos del usuario creado.
   */
  async register(registerDto: RegisterDto) {
    try {
      // 🛑 Verificar si el usuario ya está registrado con el mismo correo
      const existingUser = await this.usersService.findByEmail(
        registerDto.email,
      );
      if (existingUser) {
        return {
          success: false,
          message: 'El correo ya está registrado',
          statusCode: 400,
        };
      }

      // 🔐 Hashear la contraseña antes de almacenarla
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      // 📝 Crear el nuevo usuario con los datos proporcionados
      const newUser = await this.usersService.create({
        ...registerDto,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        password: hashedPassword,
        estado: registerDto.estado ?? 'activo', // Valor por defecto
      });

      // 📤 Retornar los datos del usuario recién creado
      return {
        success: true,
        message: 'Usuario registrado exitosamente',
        statusCode: 201,
        data: {
          id: newUser._id,
          nombreUsuario: newUser.nombre,
          email: newUser.email,
          rol: newUser.rol,
          password: newUser.password, // ⚠️ No es recomendable retornar la contraseña, aunque esté encriptada.
          fechaRegistro: newUser.fecha_registro,
          estado: newUser.estado,
        },
      };
    } catch (error) {
      // ⚠️ Manejo de errores en caso de fallos inesperados
      return {
        success: false,
        message: 'Error al registrar usuario',
        statusCode: 500,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        error: error.message,
      };
    }
  } // 🔚 Fin de la función register
}
