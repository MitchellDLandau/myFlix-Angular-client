import { TestBed } from '@angular/core/testing';

import { UserRegistrationServices } from './fetch-api-data.service';

describe('UserRegistrationServices', () => {
  let service: UserRegistrationServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
