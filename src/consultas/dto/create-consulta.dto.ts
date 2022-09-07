import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultaDTO {
  @ApiProperty({ description: 'Data da Consulta' })
  dataConsulta: Date;

  @ApiProperty({ description: 'ID do médico' })
  medicoId: string;

  @ApiProperty({ description: 'ID da receita' })
  receitaId: string;

  @ApiProperty({ description: 'ID do paciente' })
  pacienteId: string;
}
