import { CreateConsultaDTO } from './create-consulta.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateConsultaDto extends PartialType(CreateConsultaDTO) {}
