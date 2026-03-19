import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, Request, UseGuards
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { FilterLinksDto } from './dto/filter-links.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('links')
@UseGuards(JwtAuthGuard)
export class LinksController {
  constructor(private linksService: LinksService) { }

  @Post()
  create(@Request() req, @Body() dto: CreateLinkDto) {
    return this.linksService.create(req.user.id, dto);
  }

  @Get()
  findAll(@Request() req, @Query() filters: FilterLinksDto) {
    return this.linksService.findAll(req.user.id, filters);
  }

  @Get('weeks')
  getWeeks(@Request() req) {
    return this.linksService.getWeeks(req.user.id);
  }

  @Get('stats')
  getStats(@Request() req, @Query('week') week: string, @Query('year') year: string) {
    return this.linksService.getStats(req.user.id, +week, +year);
  }

  @Patch(':id')
  toggleRevisited(
    @Request() req,
    @Param('id') id: string,
    @Body('revisited') revisited: boolean,
  ) {
    return this.linksService.toggleRevisited(req.user.id, id, revisited);
  }

  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.linksService.delete(req.user.id, id);
  }
}