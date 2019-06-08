import { TestBed } from '@angular/core/testing';

import { DisplayMessageService } from './display-message.service';

describe('DisplayMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayMessageService = TestBed.get(DisplayMessageService);
    expect(service).toBeTruthy();
  });
});
