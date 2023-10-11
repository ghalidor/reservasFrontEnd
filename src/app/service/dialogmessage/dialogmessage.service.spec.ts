import { TestBed } from '@angular/core/testing';

import { DialogmessageService } from './dialogmessage.service';

describe('DialogmessageService', () => {
  let service: DialogmessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogmessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
