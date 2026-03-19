import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { FilterLinksDto } from './dto/filter-links.dto';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) { }

  private getWeekInfo() {
    const now = new Date();
    const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return { weekNumber: week, year: d.getUTCFullYear() };
  }

  async create(userId: string, dto: CreateLinkDto) {
    const { weekNumber, year } = this.getWeekInfo();
    return this.prisma.link.create({
      data: {
        url: dto.url,
        title: dto.title,
        category: dto.category,
        customLabel: dto.customLabel,
        weekNumber,
        year,
        userId,
      },
    });
  }

  async findAll(userId: string, filters: FilterLinksDto) {
    return this.prisma.link.findMany({
      where: {
        userId,
        ...(filters.week && { weekNumber: filters.week }),
        ...(filters.year && { year: filters.year }),
        ...(filters.category && { category: filters.category }),
        ...(filters.revisited !== undefined && { revisited: filters.revisited }),
      },
      orderBy: { savedAt: 'desc' },
    });
  }

  async getWeeks(userId: string) {
    const links = await this.prisma.link.findMany({
      where: { userId },
      select: { weekNumber: true, year: true },
      distinct: ['weekNumber', 'year'],
      orderBy: [{ year: 'desc' }, { weekNumber: 'desc' }],
    });
    return links;
  }

  async getStats(userId: string, week?: number, year?: number) {
    const { weekNumber, year: currentYear } = this.getWeekInfo();
    const w = week || weekNumber;
    const y = year || currentYear;

    const links = await this.prisma.link.findMany({
      where: { userId, weekNumber: w, year: y },
    });

    return {
      weekNumber: w,
      year: y,
      total: links.length,
      done: links.filter(l => l.revisited).length,
      pending: links.filter(l => !l.revisited).length,
      dsa: links.filter(l => l.category === 'DSA').length,
      gpt: links.filter(l => l.category === 'AI').length,
      blog: links.filter(l => l.category === 'BLOG').length,
      custom: links.filter(l => l.category === 'GENERAL').length,
    };
  }

  async toggleRevisited(userId: string, id: string, revisited: boolean) {
    const link = await this.prisma.link.findUnique({ where: { id } });

    if (!link) throw new NotFoundException('Link not found');
    if (link.userId !== userId) throw new ForbiddenException('Not your link');

    return this.prisma.link.update({
      where: { id },
      data: {
        revisited,
        revisitedAt: revisited ? new Date() : null,
      },
    });
  }

  async delete(userId: string, id: string) {
    const link = await this.prisma.link.findUnique({ where: { id } });

    if (!link) throw new NotFoundException('Link not found');
    if (link.userId !== userId) throw new ForbiddenException('Not your link');

    return this.prisma.link.delete({ where: { id } });
  }
}