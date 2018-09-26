import { TestBed, inject } from '@angular/core/testing';

import { APlayerService } from './a-player.service';

describe('APlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APlayerService]
    });
  });

  it('should be created', inject([APlayerService], (service: APlayerService) => {
    expect(service).toBeTruthy();
  }));
});
