/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { UtilisateurMySuffixService } from 'app/entities/utilisateur-my-suffix/utilisateur-my-suffix.service';
import { IUtilisateurMySuffix, UtilisateurMySuffix } from 'app/shared/model/utilisateur-my-suffix.model';

describe('Service Tests', () => {
  describe('UtilisateurMySuffix Service', () => {
    let injector: TestBed;
    let service: UtilisateurMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IUtilisateurMySuffix;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(UtilisateurMySuffixService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new UtilisateurMySuffix(
        0,
        'AAAAAAA',
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        currentDate,
        false,
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
            dateNaissance: currentDate.format(DATE_TIME_FORMAT),
            dateMajMdp: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a UtilisateurMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateNaissance: currentDate.format(DATE_TIME_FORMAT),
            dateMajMdp: currentDate.format(DATE_TIME_FORMAT),
            creeLe: currentDate.format(DATE_TIME_FORMAT),
            modifLe: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            dateNaissance: currentDate,
            dateMajMdp: currentDate,
            creeLe: currentDate,
            modifLe: currentDate
          },
          returnedFromService
        );
        service
          .create(new UtilisateurMySuffix(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a UtilisateurMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            techID: 'BBBBBB',
            remoteID: 1,
            login: 'BBBBBB',
            mdp: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaissance: currentDate.format(DATE_TIME_FORMAT),
            telephone: 'BBBBBB',
            email: 'BBBBBB',
            dateMajMdp: currentDate.format(DATE_TIME_FORMAT),
            statusConnexion: true,
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
            dateNaissance: currentDate,
            dateMajMdp: currentDate,
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

      it('should return a list of UtilisateurMySuffix', async () => {
        const returnedFromService = Object.assign(
          {
            techID: 'BBBBBB',
            remoteID: 1,
            login: 'BBBBBB',
            mdp: 'BBBBBB',
            nom: 'BBBBBB',
            prenom: 'BBBBBB',
            dateNaissance: currentDate.format(DATE_TIME_FORMAT),
            telephone: 'BBBBBB',
            email: 'BBBBBB',
            dateMajMdp: currentDate.format(DATE_TIME_FORMAT),
            statusConnexion: true,
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
            dateNaissance: currentDate,
            dateMajMdp: currentDate,
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

      it('should delete a UtilisateurMySuffix', async () => {
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
