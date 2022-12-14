import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Post,
  Body,
  Redirect,
} from '@nestjs/common';
import { resourceLimits } from 'worker_threads';
import { brotliDecompressSync } from 'zlib';
import { AppService } from './app.service';
import db from './db';
import { CatDto } from './cat.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('list')
  async listCats() {
    const [rows] = await db.execute(
      'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC'
    );

    return {
      macskak: rows,
    };
  }
}
