import { Test, TestingModule } from '@nestjs/testing';
import { MusicoInstrumentoController } from './musico_instrumento.controller';

describe('MusicoInstrumentoController', () => {
  let controller: MusicoInstrumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicoInstrumentoController],
    }).compile();

    controller = module.get<MusicoInstrumentoController>(MusicoInstrumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
