import { Test, TestingModule } from '@nestjs/testing';
import { MaillotsService } from './maillots.service';

describe('MaillotsService', () => {
  let service: MaillotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaillotsService],
    }).compile();

    service = module.get<MaillotsService>(MaillotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
