/**
 * AppController
 *
 * Basic controller for the root route of the API.
 *
 * Routes:
 * - GET / : Returns a simple greeting message from AppService.
 */

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
