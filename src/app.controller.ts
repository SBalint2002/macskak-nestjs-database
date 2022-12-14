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
  async index(@Query('szem_szin') szem_szin: string = '') {
    if (szem_szin != "") {
      const [rows] = await db.execute(
        "SELECT szem_szin, suly FROM macskak WHERE szem_szin LIKE ?",
        [szem_szin],
      );

      return {
        macskak: rows,
      };
    } else {
      const [rows] = await db.execute(
        'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC',
      );

      return {
        macskak: rows,
      };
    }
  }

  @Get('cats/new')
  @Render('form')
  newCatForm() {
    return {};
  }

  @Post('cats/new')
  @Redirect()
  async newCat(@Body() macska: CatDto) {
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [macska.szemszin, macska.suly],
    );
    return {
      url: '/',
    };
  }
}
