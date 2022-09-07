import { Test, TestingModule } from '@nestjs/testing';
import { CreateReceitaDTO } from './dto/create-receita.dto';
import { UpdateReceitaDto } from './dto/update-receita.dto';
import { Receita } from './entities/receita.entity';
import { ReceitasController } from './receitas.controller';
import { ReceitasService } from './receitas.service';

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

describe('ReceitasController', () => {
  let controller: ReceitasController;
  let service: ReceitasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceitasController],
      providers: [
        {
          provide: ReceitasService,
          useValue: {
            create: jest.fn().mockResolvedValue(receita1),
            findAll: jest.fn().mockResolvedValue(listaDeReceitas),
            findOne: jest.fn().mockResolvedValue(listaDeReceitas[0]),
            update: jest.fn().mockResolvedValue(receitaAtualizada),
            remove: jest.fn().mockResolvedValue(listaDeReceitas[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<ReceitasController>(ReceitasController);
    service = module.get<ReceitasService>(ReceitasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Uma receita deve ser criada', async () => {
      const body: CreateReceitaDTO = { descricao: 'Ritalina' };

      const res = await controller.create(body);

      expect(res).toEqual(receita1);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Deve listar todas as receitas', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(listaDeReceitas);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar uma receita específica', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDeReceitas[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Deve atualizar uma receita específica', async () => {
      const body: UpdateReceitaDto = { descricao: 'NovaDescrição' };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(receitaAtualizada);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Deve deletar uma receita específica', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDeReceitas[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
