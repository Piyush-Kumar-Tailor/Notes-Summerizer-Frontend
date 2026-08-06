import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ChangePasswordRequest } from '../models/auth-models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/users`;

  changePassword(
    request: ChangePasswordRequest
  ): Observable<string> {

    return this.http.put(

      `${this.apiUrl}/change-password`,

      request,

      {

        responseType: 'text'

      }

    );

  }

}