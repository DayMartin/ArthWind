import { Test, TestingModule } from '@nestjs/testing';
import { EventoMusicoService } from './evento_musico.service';

describe('EventoMusicoService', () => {
  let service: EventoMusicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventoMusicoService],
    }).compile();

    service = module.get<EventoMusicoService>(EventoMusicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
