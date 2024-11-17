import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './usuario.service';
import { CreateUserDto } from './dtos/criar-usuario.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('usuario')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async obterUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.userService.obterUsuario(id);
  }
  @Get(':nome')
  async obterUsuarioEmail(@Param('nome') nome: string) {
    return this.userService.obterUsuarioEmail(nome);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async criarUsuario(@Body() createUserDto: CreateUserDto) {
    return this.userService.criarUsuario(createUserDto);
  }
}
