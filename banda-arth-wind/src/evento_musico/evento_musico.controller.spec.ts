import { Test, TestingModule } from '@nestjs/testing';
import { EventoMusicoController } from './evento_musico.controller';

describe('EventoMusicoController', () => {
  let controller: EventoMusicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventoMusicoController],
    }).compile();

    controller = module.get<EventoMusicoController>(EventoMusicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
