import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicoDTO {
  @ApiProperty({ description: 'Nome do médico' })
  nome: string;

  @ApiProperty({ description: 'Telefone do médico' })
  telefone: string;

  @ApiProperty({ description: 'CRM do médico' })
  crm: string;
}
