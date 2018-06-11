import { TestBed, inject } from '@angular/core/testing';

import { TmyteamService } from './tmyteam.service';

describe('TmyteamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TmyteamService]
    });
  });

  it('should be created', inject([TmyteamService], (service: TmyteamService) => {
    expect(service).toBeTruthy();
  }));
});
