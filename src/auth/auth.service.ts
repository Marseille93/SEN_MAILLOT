import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { RegisterDto } from './dto/register-auth.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  // Méthode pour créer un compte utilisateur
  async register(registerDto: RegisterDto): Promise<Users> {
    const {
      nomComplet,
      email,
      password,
      telephone,
      naissance,
      role = 'user',
    } = registerDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('Email already in use');
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Créer et sauvegarder l'utilisateur
    const newUser = this.usersRepository.create({
      nomComplet,
      email,
      password: hashedPassword,
      telephone,
      naissance,
      role, // Assigner le rôle
    });

    return this.usersRepository.save(newUser);
  }

  // Méthode pour se connecter et générer un JWT
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Générer un JWT
    const payload = { id: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  // Méthode pour mettre à jour le mot de passe
  async updatePassword(
    userId: number,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Vérifier l'ancien mot de passe
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Old password is incorrect');
    }

    // Hacher le nouveau mot de passe
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    // Sauvegarder l'utilisateur avec le nouveau mot de passe
    await this.usersRepository.save(user);
  }
}
