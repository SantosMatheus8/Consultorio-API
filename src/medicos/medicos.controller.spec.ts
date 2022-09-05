import { Test, TestingModule } from '@nestjs/testing';
import { CreateMedicoDTO } from './dto/create-medico.dto';
import { Medico } from './entities/medico.entity';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';

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

describe('MedicosController', () => {
  let controller: MedicosController;
  let service: MedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicosController],
      providers: [
        {
          provide: MedicosService,
          useValue: {
            create: jest.fn().mockResolvedValue(medico1),
            findAll: jest.fn().mockResolvedValue(listaDeMedicos),
            findOne: jest.fn().mockResolvedValue(listaDeMedicos[0]),
            update: jest.fn().mockResolvedValue(medicoAtualizado),
            remove: jest.fn().mockResolvedValue(listaDeMedicos[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<MedicosController>(MedicosController);
    service = module.get<MedicosService>(MedicosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Um medico deve ser criado', async () => {
      const body: CreateMedicoDTO = {
        nome: 'Matheus',
        telefone: '112345678',
        crm: '45645631',
      };

      const res = await controller.create(body);

      expect(res).toEqual(medico1);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Deve listar todos os médicos', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(listaDeMedicos);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar um médico específico', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDeMedicos[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Deve atualizar um médico específico', async () => {
      const body: Partial<CreateMedicoDTO> = { telefone: '5349583402' };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(medicoAtualizado);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Deve deletar um médico específico', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDeMedicos[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
