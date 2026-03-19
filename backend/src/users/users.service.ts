import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(email: string, password: string, name?: string) {
        const existing = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existing) {
            throw new ConflictException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        const { password: _, ...result } = user;
        return result;
    }

    async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) return null;

        const { password: _, ...result } = user;
        return result;
    }
}