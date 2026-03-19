import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    // Basic implementation for now
    return { message: 'Link created successfully', data: createLinkDto };
  }

  async findAll() {
    return { message: 'All links retrieved' };
  }
}
