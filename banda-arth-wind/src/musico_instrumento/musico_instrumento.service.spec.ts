import { Test, TestingModule } from '@nestjs/testing';
import { MusicoInstrumentoService } from './musico_instrumento.service';

describe('MusicoInstrumentoService', () => {
  let service: MusicoInstrumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MusicoInstrumentoService],
    }).compile();

    service = module.get<MusicoInstrumentoService>(MusicoInstrumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
