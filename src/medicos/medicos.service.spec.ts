import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Medico } from './entities/medico.entity';
import { MedicosService } from './medicos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const medico1 = new Medico();
medico1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';
medico1.nome = 'Matheus';
medico1.telefone = '112345678';
medico1.crm = '45645631';

const medico2 = new Medico();
medico2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';
medico2.nome = 'Julio';
medico2.telefone = '0987654';
medico2.crm = '86758658';

const medicoAtualizado = medico1;
medicoAtualizado.telefone = '5349583402';

const listaDeMedicos: Medico[] = [medico1, medico2];

describe('MedicosService', () => {
  let service: MedicosService;
  let repository: Repository<Medico>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MedicosService,
        {
          provide: getRepositoryToken(Medico),
          useValue: {
            find: jest.fn().mockResolvedValue(listaDeMedicos),
            create: jest.fn().mockResolvedValue(listaDeMedicos[0]),
            save: jest.fn().mockResolvedValue(listaDeMedicos[0]),
            findOne: jest.fn().mockResolvedValue(listaDeMedicos[0]),
            preload: jest.fn().mockResolvedValue(listaDeMedicos[0]),
            remove: jest.fn().mockResolvedValue(listaDeMedicos[0]),
          },
        },
      ],
    }).compile();

    service = module.get<MedicosService>(MedicosService);
    repository = module.get<Repository<Medico>>(getRepositoryToken(Medico));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Um medico deve ser criado', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

      const medico = await service.create({
        nome: 'Matheus',
        telefone: '112345678',
        crm: '45645631',
      });

      expect(medico).toEqual(listaDeMedicos[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('deve retornar o erro BadRequestException', async () => {
      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValueOnce(listaDeMedicos[0]);

      try {
        await service.create({
          nome: 'Matheus',
          telefone: '112345678',
          crm: '45645631',
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('O CRM informado já está cadastrado');
      }
    });
  });

  describe('findAll', () => {
    it('Deve listar todos os médicos', async () => {
      const medicos = await service.findAll();

      expect(medicos).toEqual(listaDeMedicos);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um médico específico', async () => {
      const medico = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(medico).toEqual(listaDeMedicos[0]);
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
          `Não foi encontrado um médico com o ID : ${id}`,
        );
      }
    });
  });

  describe('update', () => {
    it('Deve atualizar um médico específico', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(medicoAtualizado);

      const medico = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { telefone: '5349583402' },
      );

      expect(medico).toEqual(medicoAtualizado);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('deve retornar o erro NotFoundException', async () => {
      const id = '1';
      jest.spyOn(repository, 'preload').mockResolvedValueOnce(undefined);

      try {
        await service.update(id, { telefone: '5349583402' });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual(
          `Não foi encontrado um médico com o ID : ${id}`,
        );
      }
    });
  });

  describe('remove', () => {
    it('Deve deletar um médico específico', async () => {
      const medico = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(medico).toBe(listaDeMedicos[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
