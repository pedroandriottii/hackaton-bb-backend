import {
  Controller,
  Get,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('me')
  async findOne(@Req() req) {
    console.log(req.userid);
    return await this.usersService.findOne(req.userid);
  }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Req() req,
  // ) {
  //   if (id !== req.userid) {
  //     throw new ForbiddenException('Acesso negado');
  //   }
  //   return await this.usersService.update(id, updateUserDto);
  // }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    if (id !== req.userid) {
      throw new ForbiddenException('Acesso negado');
    }
    return await this.usersService.remove(id);
  }
}
