import { TestBed } from '@angular/core/testing';

import { TypeService } from './type.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TypeService', () => {
  let service: TypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
