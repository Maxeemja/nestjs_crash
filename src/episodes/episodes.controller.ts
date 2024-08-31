import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { ConfigService } from '../config/config.service';
import { CreateEpisodeDto } from './dto/createEpisode';

@Controller('episodes')
export class EpisodesController {
  constructor(
    private readonly episodesService: EpisodesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'desc',
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.episodesService.findAll(sort, limit);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param() id: string) {
    const episode = await this.episodesService.findOne(id);
    if (!episode) {
      throw new HttpException(
        'No episode found with requested ID',
        HttpStatus.NOT_FOUND,
      );
    }
    return episode;
  }

  @Post()
  create(@Body(ValidationPipe) episode: CreateEpisodeDto) {
    return this.episodesService.create(episode);
  }
}
