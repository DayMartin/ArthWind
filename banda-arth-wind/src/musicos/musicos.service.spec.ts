import { Test, TestingModule } from '@nestjs/testing';
import { MusicosService } from './musicos.service';

describe('MusicosService', () => {
  let service: MusicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicosService],
    }).compile();

    service = module.get<MusicosService>(MusicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
