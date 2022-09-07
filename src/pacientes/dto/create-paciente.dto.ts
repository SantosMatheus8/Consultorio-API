import { ApiProperty } from '@nestjs/swagger';

export class CreatePacienteDTO {
  @ApiProperty({ description: 'Nome do paciente' })
  nome: string;

  @ApiProperty({ description: 'Telefone do paciente' })
  telefone: string;

  @ApiProperty({ description: 'Convenio médico do paciente' })
  convenio: string;

  @ApiProperty({ description: 'Data de nascimento do paciente' })
  dataNascimento: Date;
}
