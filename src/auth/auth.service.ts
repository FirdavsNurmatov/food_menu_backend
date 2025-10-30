import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 🔒 Static admin foydalanuvchi
  private readonly admin = {
    username: 'admin',
    password: 'admin123',
  };

  async login(dto: CreateAuthDto) {
    if (
      dto.username === this.admin.username &&
      dto.password === this.admin.password
    ) {
      const payload = { username: dto.username, role: 'admin' };
      const token = await this.jwtService.signAsync(payload);

      return {
        message: 'Login muvaffaqiyatli',
        token,
      };
    }

    return null;
  }
}
