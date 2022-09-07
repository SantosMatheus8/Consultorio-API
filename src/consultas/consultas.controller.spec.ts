import { Test, TestingModule } from '@nestjs/testing';
import { Medico } from '../../src/medicos/entities/medico.entity';
import { Paciente } from '../../src/pacientes/entities/paciente.entity';
import { Receita } from '../../src/receitas/entities/receita.entity';
import { ConsultasController } from './consultas.controller';
import { ConsultasService } from './consultas.service';
import { CreateConsultaDTO } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { Consulta } from './entities/consulta.entity';

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

describe('ConsultasController', () => {
  let controller: ConsultasController;
  let service: ConsultasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultasController],
      providers: [
        {
          provide: ConsultasService,
          useValue: {
            create: jest.fn().mockResolvedValue(consulta1),
            findAll: jest.fn().mockResolvedValue(listaDeConsultas),
            findOne: jest.fn().mockResolvedValue(listaDeConsultas[0]),
            update: jest.fn().mockResolvedValue(consultaAtualizada),
            remove: jest.fn().mockResolvedValue(listaDeConsultas[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<ConsultasController>(ConsultasController);
    service = module.get<ConsultasService>(ConsultasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Uma consulta deve ser criada', async () => {
      const body: CreateConsultaDTO = {
        dataConsulta: new Date('11/12/2022'),
        medicoId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        pacienteId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        receitaId: '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      };

      const res = await controller.create(body);

      expect(res).toEqual(consulta1);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('Deve listar todas as consultas', async () => {
      const res = await controller.findAll();

      expect(res).toEqual(listaDeConsultas);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('Deve retornar uma consulta específica', async () => {
      const res = await controller.findOne(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDeConsultas[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('Deve atualizar uma consulta específica', async () => {
      const body: UpdateConsultaDto = {
        dataConsulta: new Date('11/12/2022'),
      };

      const res = await controller.update(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
        body,
      );

      expect(res).toEqual(consultaAtualizada);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('Deve deletar uma consulta específica', async () => {
      const res = await controller.remove(
        '1ca415c6-32be-488c-b7bf-12b8649c99bd',
      );

      expect(res).toEqual(listaDeConsultas[0]);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
