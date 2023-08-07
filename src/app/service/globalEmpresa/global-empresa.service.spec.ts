import { TestBed } from '@angular/core/testing';

import { GlobalEmpresaService } from './global-empresa.service';

describe('GlobalEmpresaService', () => {
  let service: GlobalEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
