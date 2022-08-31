import { Test, TestingModule } from '@nestjs/testing';
import { Receita } from './entities/receita.entity';
import { ReceitasService } from './receitas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const receita1 = new Receita();
receita1.descricao = 'Ritalina';
receita1.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

const receita2 = new Receita();
receita2.descricao = 'Venvanse';
receita2.id = 'c3d6b2a2-0c41-45da-ad0f-c5b20318c647';

const receitaAtualizada = new Receita();
receitaAtualizada.descricao = 'NovaDescrição';
receitaAtualizada.id = '1ca415c6-32be-488c-b7bf-12b8649c99bd';

const listaDeReceitas: Receita[] = [receita1, receita2];

describe('ReceitasService', () => {
  let service: ReceitasService;
  let repository: Repository<Receita>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReceitasService,
        {
          provide: getRepositoryToken(Receita),
          useValue: {
            find: jest.fn().mockResolvedValue(listaDeReceitas),
            create: jest.fn().mockResolvedValue(listaDeReceitas[0]),
            save: jest.fn().mockResolvedValue(listaDeReceitas[0]),
            findOne: jest.fn().mockResolvedValue(listaDeReceitas[0]),
            preload: jest.fn().mockResolvedValue(listaDeReceitas[0]),
            remove: jest.fn().mockResolvedValue(listaDeReceitas[0]),
          },
        },
      ],
    }).compile();

    service = module.get<ReceitasService>(ReceitasService);
    repository = module.get<Repository<Receita>>(getRepositoryToken(Receita));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('Uma receita deve ser criada', async () => {
      const receita = await service.create({ descricao: 'Ritalina' });

      expect(receita).toEqual(listaDeReceitas[0]);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Deve listar todas as receitas', async () => {
      const receitas = await service.findAll();

      expect(receitas).toEqual(listaDeReceitas);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar uma receita específica', async () => {
      const receita = await service.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(receita).toEqual(listaDeReceitas[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Deve atualizar uma receita específica', async () => {
      jest.spyOn(repository, 'save').mockResolvedValueOnce(receitaAtualizada);

      const receita = await service.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        { descricao: 'NovaDescrição' },
      );

      expect(receita).toEqual(receitaAtualizada);
      expect(repository.preload).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Deve deletar uma receita específica', async () => {
      const receita = await service.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(receita).toBe(listaDeReceitas[0]);
      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
