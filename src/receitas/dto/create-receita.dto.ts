import { ApiProperty } from '@nestjs/swagger';

export class CreateReceitaDTO {
  @ApiProperty({ description: 'Descrição da receita' })
  descricao: string;
}
