import { Test, TestingModule } from '@nestjs/testing';
import { CreatePacienteDTO } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';
import { PacientesController } from './pacientes.controller';
import { PacientesService } from './pacientes.service';

const paciente1 = new Paciente();
paciente1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
paciente1.nome = 'Matheus';
paciente1.telefone = '112345678';
paciente1.convenio = 'unimed';
paciente1.dataNascimento = new Date('02/05/1999');

const paciente2 = new Paciente();
paciente2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
paciente2.nome = 'Julio';
paciente2.telefone = '0987654';
paciente2.convenio = 'unimed';
paciente2.dataNascimento = new Date('07/04/1978');

const pacienteAtualizado = paciente1;
pacienteAtualizado.telefone = '5349583402';

const listaDePacientes: Paciente[] = [paciente1, paciente2];

describe('PacientesController', () => {
  let controller: PacientesController;
  let service: PacientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacientesController],
      providers: [
        {
          provide: PacientesService,
          useValue: {
            create: jest.fn().mockResolvedValue(paciente1),
            findAll: jest.fn().mockResolvedValue(listaDePacientes),
            findOne: jest.fn().mockResolvedValue(listaDePacientes[0]),
            update: jest.fn().mockResolvedValue(pacienteAtualizado),
            remove: jest.fn().mockResolvedValue(listaDePacientes[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<PacientesController>(PacientesController);
    service = module.get<PacientesService>(PacientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Um paciente deve ser criado', async () => {
      const body: CreatePacienteDTO = {
        nome: 'Matheus',
        telefone: '112345678',
        convenio: 'unimed',
        dataNascimento: new Date('02/05/1999'),
      };

      const res = await controller.create(body);

      expect(res).toEqual(listaDePacientes[0]);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Deve listar todos os pacientes', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(listaDePacientes);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um paciente específico', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDePacientes[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Deve atualizar um paciente específico', async () => {
      const body: UpdatePacienteDto = { telefone: '5349583402' };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(pacienteAtualizado);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Deve deletar um paciente específico', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDePacientes[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
