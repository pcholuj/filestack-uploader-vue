import { AccountService, AccountModel } from '@app/main/account/services/account.service';

import { TestBed, async, inject } from '@angular/core/testing';
import {
    HttpModule,
    Http,
    Response,
    Headers,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

const mockAccountData = {
    id: 1,
    avatar: '',
    login: 'test',
    name: 'test',
    email: 'test@test.com',
    phone: 123,
    publicId: 111,
    sharedKey: null,
    subdomain: 'test.smartframe.io',
    oldPassword: null,
    newPassword: null,
    enabledCapabilities: [
        'testcap'
    ]
};

const mockAccountModel = new AccountModel(Object.assign({}, mockAccountData));

describe('Account/AccountService/load', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: XHRBackend, useClass: MockBackend },
                AccountService
            ]
        });
    });

    describe('load()', () => {
        it('should run without errors', inject([AccountService, XHRBackend], (accountService, mockBackend) => {
            expect(accountService).toBeDefined();
        }));

        it('should load test account', inject([AccountService, XHRBackend], (accountService, mockBackend) => {
            spyOn(accountService._account$, 'next').and.callThrough();

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockAccountData),
                    headers: new Headers({
                        status: 200
                    })
                })));
            });

            accountService.load().subscribe((accountModel) => {
                expect(accountService._account$.next).toHaveBeenCalledWith(mockAccountModel);
                expect(accountModel).toEqual(mockAccountModel);
            });
        }));

        it('should throw error when account not exists', inject([AccountService, XHRBackend], (accountService, mockBackend) => {
            spyOn(accountService._account$, 'next').and.callThrough();

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    headers: new Headers({
                        status: 404
                    })
                })));
            });

            accountService.load().subscribe((accountModel) => {
                expect(accountService._account$.next).not.toHaveBeenCalled();
                expect(accountModel).toBe(null);
            });
        }));
    });

    describe('isLoggedIn()', () => {
        it('should return true if user is logged in', inject([AccountService, XHRBackend], (accountService, mockBackend) => {
            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockAccountData),
                    headers: new Headers({
                        status: 200
                    })
                })));
            });

            accountService.load().subscribe(() => {
                expect(accountService.isLoggedIn()).toBe(true);
            });
        }));

        it('should return false if user is not logged in', inject([AccountService, XHRBackend], (accountService, mockBackend) => {
            mockBackend.connections.subscribe((connection) => {

                connection.mockRespond(new Response(new ResponseOptions({
                    headers: new Headers({
                        status: 401
                    })
                })));
            });

            accountService.load().subscribe(() => {
                expect(accountService.isLoggedIn()).toBe(false);
            });
        }));
    });

    describe('save()', () => {
        it('should should save correct account model', inject([AccountService, XHRBackend], (accountService, mockBackend) => {
            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockAccountData)
                })));
            });

            spyOn(accountService._account$, 'next').and.callThrough();

            accountService.save(mockAccountModel).subscribe((responseModel) => {
                expect(accountService._account$.next).toHaveBeenCalledWith(mockAccountModel);
                expect(responseModel).toEqual(mockAccountModel);
            });
        }));
    });
});
