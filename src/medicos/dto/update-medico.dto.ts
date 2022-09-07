import { PartialType } from '@nestjs/swagger';
import { CreateMedicoDTO } from './create-medico.dto';

export class UpdateMedicoDto extends PartialType(CreateMedicoDTO) {}
