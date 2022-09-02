import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from '../../src/medicos/entities/medico.entity';
import { Paciente } from '../../src/pacientes/entities/paciente.entity';
import { Receita } from '../../src/receitas/entities/receita.entity';
import { Repository } from 'typeorm';
import { ConsultasService } from './consultas.service';
import { Consulta } from './entities/consulta.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const medico = new Medico();
medico.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
medico.nome = 'Matheus';
medico.telefone = '112345678';
medico.crm = '45645631';

const paciente = new Paciente();
paciente.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
paciente.nome = 'Matheus';
paciente.telefone = '112345678';
paciente.convenio = 'unimed';
paciente.dataNascimento = new Date('02/05/1999');

const receita = new Receita();
receita.descricao = 'Ritalina';
receita.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

const consulta1 = new Consulta();
consulta1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
consulta1.dataConsulta = new Date('11/12/2022');
consulta1.medico = medico;
consulta1.receita = receita;
consulta1.paciente = paciente;

const consulta2 = new Consulta();
consulta2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
consulta2.dataConsulta = new Date('11/12/2022');
consulta2.medico = medico;
consulta2.receita = receita;
consulta2.paciente = paciente;

const consultaAtualizada = consulta1;
consultaAtualizada.dataConsulta = new Date('11/12/2022');

const listaDeConsultas: Consulta[] = [consulta1, consulta2];

describe('ConsultasService', () => {
  let service: ConsultasService;
  let repository: Repository<Consulta>;
  let medicoRepository: Repository<Medico>;
  let receitaRepository: Repository<Receita>;
  let pacienteRepository: Repository<Paciente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsultasService,
        {
          provide: getRepositoryToken(Consulta),
          useValue: {
            find: jest.fn().mockResolvedValue(listaDeConsultas),
            create: jest.fn().mockResolvedValue(listaDeConsultas[0]),
            save: jest.fn().mockResolvedValue(listaDeConsultas[0]),
            findOne: jest.fn().mockResolvedValue(listaDeConsultas[0]),
            preload: jest.fn().mockResolvedValue(listaDeConsultas[0]),
            remove: jest.fn().mockResolvedValue(listaDeConsultas[0]),
          },
        },
        {
          provide: getRepositoryToken(Medico),
          useValue: {
            findOne: jest.fn().mockResolvedValue(medico),
          },
        },
        {
          provide: getRepositoryToken(Receita),
          useValue: {
            findOne: jest.fn().mockResolvedValue(receita),
          },
        },
        {
          provide: getRepositoryToken(Paciente),
          useValue: {
            findOne: jest.fn().mockResolvedValue(paciente),
          },
        },
      ],
    }).compile();

    service = module.get<ConsultasService>(ConsultasService);
    repository = module.get<Repository<Consulta>>(getRepositoryToken(Consulta));
    medicoRepository = module.get<Repository<Medico>>(
      getRepositoryToken(Medico),
    );
    receitaRepository = module.get<Repository<Receita>>(
      getRepositoryToken(Receita),
    );
    pacienteRepository = module.get<Repository<Paciente>>(
      getRepositoryToken(Paciente),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(medicoRepository).toBeDefined();
    expect(receitaRepository).toBeDefined();
    expect(pacienteRepository).toBeDefined();
  });

  describe('create', () => {
    it('Uma consulta deve ser criada', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const consulta = await service.create({
        dataConsulta: new Date('11/12/2022'),
        medicoId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        pacienteId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        receitaId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      });

      expect(consulta).toEqual(listaDeConsultas[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(medicoRepository.findOne).toHaveBeenCalledTimes(1);
      expect(pacienteRepository.findOne).toHaveBeenCalledTimes(1);
      expect(receitaRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('não deve encontrar o medicoId', async () => {
      const medicoId = '1';

      jest.spyOn(medicoRepository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.create({
          dataConsulta: new Date('11/12/2022'),
          medicoId,
          pacienteId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
          receitaId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `O médico de ID : ${medicoId}, não foi encontrado`,
        );
      }
    });

    it('não deve encontrar a receitaId', async () => {
      const receitaId = '1';

      jest.spyOn(receitaRepository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.create({
          dataConsulta: new Date('11/12/2022'),
          medicoId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
          pacienteId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
          receitaId,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `A receita de ID : ${receitaId}, não foi encontrado`,
        );
      }
    });
  });

  it('não deve encontrar o pacienteID', async () => {
    const pacienteId = '1';

    jest.spyOn(pacienteRepository, 'findOne').mockResolvedValueOnce(undefined);

    try {
      await service.create({
        dataConsulta: new Date('11/12/2022'),
        medicoId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        pacienteId,
        receitaId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual(
        `O paciente de ID : ${pacienteId}, não foi encontrado`,
      );
    }
  });

  describe('findAll', () => {
    it('Deve listar todas as consultas', async () => {
      const consultas = await service.findAll();

      expect(consultas).toEqual(listaDeConsultas);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar uma consulta específica', async () => {
      const consulta = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(consulta).toEqual(listaDeConsultas[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('deve retornar o erro NotFoundException', async () => {
      const id = '1';
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      try {
        await service.findOne(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma consulta com o ID : ${id}`,
        );
      }
    });
  });

  describe('update', () => {
    it('Deve atualizar uma consulta específica', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(consultaAtualizada);

      const consulta = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { dataConsulta: new Date('11/23/2022') },
      );

      expect(consulta).toEqual(consultaAtualizada);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('deve retornar o erro NotFoundException', async () => {
      const id = '1';
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update('1', {
          dataConsulta: new Date('11/23/2022'),
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado uma consulta com o ID : ${id}`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Deve deletar uma consulta específica', async () => {
      const receita = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(receita).toBe(listaDeConsultas[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
