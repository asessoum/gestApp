/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ClientMySuffixService } from 'app/entities/client-my-suffix/client-my-suffix.service';
import { IClientMySuffix, ClientMySuffix, Genre } from 'app/shared/model/client-my-suffix.model';

describe('Service Tests', () => {
  describe('ClientMySuffix Service', () => {
    let injector: TestBed;
    let service: ClientMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IClientMySuffix;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(ClientMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ClientMySuffix(
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        Genre.HOMME,
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        false,
        currentDate,
        'AAAAAAA',
        currentDate,
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            naissance: currentDate.format(DATE_TIME_FORMAT),
            dCarteUtil: currentDate.format(DATE_TIME_FORMAT),
            creeLe: currentDate.format(DATE_TIME_FORMAT),
            modifLe: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a ClientMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            naissance: currentDate.format(DATE_TIME_FORMAT),
            dCarteUtil: currentDate.format(DATE_TIME_FORMAT),
            creeLe: currentDate.format(DATE_TIME_FORMAT),
            modifLe: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            naissance: currentDate,
            dCarteUtil: currentDate,
            creeLe: currentDate,
            modifLe: currentDate
          },
          returnedFromService
        );
        service
          .create(new ClientMySuffix(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a ClientMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            techID: 'BBBBBB',
            remoteID: 1,
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            naissance: currentDate.format(DATE_TIME_FORMAT),
            genre: 'BBBBBB',
            numCarteCli: 'BBBBBB',
            dCarteUtil: currentDate.format(DATE_TIME_FORMAT),
            tel: 'BBBBBB',
            email: 'BBBBBB',
            photoID: 'BBBBBB',
            description: 'BBBBBB',
            estActif: true,
            creeLe: currentDate.format(DATE_TIME_FORMAT),
            creePar: 'BBBBBB',
            modifLe: currentDate.format(DATE_TIME_FORMAT),
            modifPar: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            naissance: currentDate,
            dCarteUtil: currentDate,
            creeLe: currentDate,
            modifLe: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of ClientMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            techID: 'BBBBBB',
            remoteID: 1,
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            naissance: currentDate.format(DATE_TIME_FORMAT),
            genre: 'BBBBBB',
            numCarteCli: 'BBBBBB',
            dCarteUtil: currentDate.format(DATE_TIME_FORMAT),
            tel: 'BBBBBB',
            email: 'BBBBBB',
            photoID: 'BBBBBB',
            description: 'BBBBBB',
            estActif: true,
            creeLe: currentDate.format(DATE_TIME_FORMAT),
            creePar: 'BBBBBB',
            modifLe: currentDate.format(DATE_TIME_FORMAT),
            modifPar: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            naissance: currentDate,
            dCarteUtil: currentDate,
            creeLe: currentDate,
            modifLe: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ClientMySuffix', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
