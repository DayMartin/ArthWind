import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentosController } from './instrumentos.controller';

describe('InstrumentosController', () => {
  let controller: InstrumentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstrumentosController],
    }).compile();

    controller = module.get<InstrumentosController>(InstrumentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
