import { Test, TestingModule } from '@nestjs/testing';
import { MusicosController } from './musicos.controller';

describe('MusicosController', () => {
  let controller: MusicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicosController],
    }).compile();

    controller = module.get<MusicosController>(MusicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
