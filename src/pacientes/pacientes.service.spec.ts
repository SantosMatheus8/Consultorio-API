import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacientesService } from './pacientes.service';
import { getRepositoryToken } from '@nestjs/typeorm';

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

describe('PacientesService', () => {
  let service: PacientesService;
  let repository: Repository<Paciente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacientesService,
        {
          provide: getRepositoryToken(Paciente),
          useValue: {
            find: jest.fn().mockResolvedValue(listaDePacientes),
            create: jest.fn().mockResolvedValue(listaDePacientes[0]),
            save: jest.fn().mockResolvedValue(listaDePacientes[0]),
            findOne: jest.fn().mockResolvedValue(listaDePacientes[0]),
            preload: jest.fn().mockResolvedValue(listaDePacientes[0]),
            remove: jest.fn().mockResolvedValue(listaDePacientes[0]),
          },
        },
      ],
    }).compile();

    service = module.get<PacientesService>(PacientesService);
    repository = module.get<Repository<Paciente>>(getRepositoryToken(Paciente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Um paciente deve ser criado', async () => {
      const paciente = await service.create({
        nome: 'Matheus',
        telefone: '112345678',
        convenio: 'unimed',
        dataNascimento: new Date('02/05/1999'),
      });

      expect(paciente).toEqual(listaDePacientes[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Deve listar todos os pacientes', async () => {
      const pacientes = await service.findAll();

      expect(pacientes).toEqual(listaDePacientes);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um paciente específico', async () => {
      const paciente = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(paciente).toEqual(listaDePacientes[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Deve atualizar um paciente específico', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(pacienteAtualizado);

      const paciente = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { telefone: '5349583402' },
      );

      expect(paciente).toEqual(pacienteAtualizado);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Deve deletar um paciente específico', async () => {
      const paciente = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(paciente).toBe(listaDePacientes[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
