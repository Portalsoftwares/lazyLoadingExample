import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    const apiServiceStub = () => ({
      login: (username: string, password: string) => ({ pipe: () => ({}) }),
      getLoggedUser: () => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: ApiService, useFactory: apiServiceStub }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('initService', () => {
    it('makes expected calls', () => {
      spyOn(service, 'setToken').and.callThrough();
      service.initService();
      expect(service.setToken).toHaveBeenCalled();
    });
  });

  describe('getLoggedUser', () => {
    it('makes expected calls', () => {
      const apiServiceStub: ApiService = TestBed.inject(ApiService);
      spyOn(apiServiceStub, 'getLoggedUser').and.callThrough();
      service.getLoggedUser();
      expect(apiServiceStub.getLoggedUser).toHaveBeenCalled();
    });
  });
});
