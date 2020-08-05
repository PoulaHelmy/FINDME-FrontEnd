import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { flatMap, catchError } from 'rxjs/operators';
import { forkJoin, of, timer, throwError } from 'rxjs';
import { environment as env } from '../../../../../environments/environment';
// private (non-exported)

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'c482111b3f50406c9d83ec9a87edcfbe',
  }),
};
const httpOptionsOctet = {
  headers: new HttpHeaders({
    'Content-Type': 'application/octet-stream',
    'Ocp-Apim-Subscription-Key': 'c482111b3f50406c9d83ec9a87edcfbe',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class FaceApiService {
  constructor(private http: HttpClient) {}

  // ***** Person Group Operations *****
  /*****************************--- Used ---********************************/
  getPersonGroups() {
    return this.http
      .get<any[]>(`${env.azure.endpoint}/persongroups`, httpOptions)
      .pipe(catchError((e) => throwError(e)));
  }

  createPersonGroup(personGroup) {
    return this.http
      .put<any[]>(
        `${env.azure.endpoint}/persongroups/${personGroup.personGroupId}`,
        personGroup,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  deletePersonGroup(personGroupId) {
    return this.http
      .delete(
        `${env.azure.endpoint}/persongroups/${personGroupId}`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  trainPersonGroup(personGroupId) {
    return this.http
      .post<any[]>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/train`,
        null,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  getPersonGroupTrainingStatus(personGroupId) {
    return this.http
      .get<any>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/training`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  // ***** Persons Operations *****

  getPersonsByGroup(personGroupId) {
    return this.http
      .get<any[]>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  getPerson(personGroupId, personId) {
    return this.http
      .get<any[]>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  // ***** Person Operations *****

  createPerson(personGroupId, person) {
    return this.http
      .post<any>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons`,
        person,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  deletePerson(personGroupId, personId) {
    return this.http
      .delete<any[]>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }
  updatePerson(personGroupId, personId, data: object) {
    return this.http
      .patch(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}`,
        data,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }
  // ***** Person Face Operations *****/

  getPersonFaces(personGroupId, personId) {
    return this.http
      .get<any>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}`,
        httpOptions
      )
      .pipe(
        flatMap((person) => {
          let obsList = [];
          if (person.persistedFaceIds.length) {
            for (const faceId of person.persistedFaceIds) {
              obsList.push(this.getPersonFace(personGroupId, personId, faceId));
            }
            return forkJoin(obsList);
          } else {
            return of([]);
          }
        }),
        catchError((e) => throwError(e))
      );
  }
  getPersonFace(personGroupId, personId, faceId) {
    return this.http
      .get(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedfaces/${faceId}`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }
  addPersonFace(personGroupId, personId, url) {
    return this.http
      .post<any>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedfaces?userData=dsdsdsdsdsdsd`,
        url,
        httpOptionsOctet
      )
      .pipe(catchError((e) => throwError(e)));
  }
  addPersonFaceByUrl(personGroupId, personId, url) {
    return this.http
      .post<any>(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedfaces?userData=${url}`,
        { url: url },
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }
  deletePersonFace(personGroupId, personId, faceId) {
    return this.http
      .delete(
        `${env.azure.endpoint}/persongroups/${personGroupId}/persons/${personId}/persistedfaces/${faceId}`,
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  // ***** Face List Operations *****

  createFaceList(faceListId, userData, name) {
    return this.http
      .put(
        `${env.azure.endpoint}/facelists/${faceListId}`,
        { name: name, userData: userData },
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  addFace(faceListId, url) {
    return this.http
      .post(
        `${env.azure.endpoint}/facelists/${faceListId}/persistedFaces`,
        { url: url, userData: url },
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }
  addFaceFromLocal(faceListId, url) {
    return this.http
      .post(
        `${env.azure.endpoint}/facelists/${faceListId}/persistedFaces`,
        url,
        httpOptionsOctet
      )
      .pipe(catchError((e) => throwError(e)));
  }
  getAllLists() {
    return this.http
      .get<any>(`${env.azure.endpoint}/facelists`, httpOptions)
      .pipe();
  }
  deleteFaceList(faceListId) {
    return this.http
      .delete(`${env.azure.endpoint}/facelists/${faceListId}`, httpOptions)
      .pipe(catchError((e) => throwError(e)));
  }
  getFaceList(faceListId) {
    return this.http
      .get(`${env.azure.endpoint}/facelists/${faceListId}`, httpOptions)
      .pipe(catchError((e) => throwError(e)));
  }
  // ***** Face Operations *****

  detect(url) {
    return this.http.post<any[]>(
      `${env.azure.endpoint}/detect`,
      url,
      httpOptionsOctet
    );
  }
  detect2(url) {
    return this.http.post<any[]>(
      `${env.azure.endpoint}/detect?returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,glasses,emotion,facialHair`,
      url,
      httpOptionsOctet
    );
  }
  identify(personGroupId, faceIds) {
    let request = {
      personGroupId: personGroupId,
      faceIds: faceIds,
      confidenceThreshold: 0.4,
    };
    return this.http
      .post<any[]>(`${env.azure.endpoint}/identify`, request, httpOptions)
      .pipe(catchError((e) => throwError(e)));
  }

  group(faceIds) {
    return this.http
      .post<any>(
        `${env.azure.endpoint}/group`,
        { faceIds: faceIds },
        httpOptions
      )
      .pipe(catchError((e) => throwError(e)));
  }

  findSimilar(faceListId, faceId) {
    let request = { faceId: faceId, faceListId: faceListId };
    return this.http
      .post<any>(`${env.azure.endpoint}/findsimilars`, request, httpOptions)
      .pipe(catchError((e) => throwError(e)));
  }
}
