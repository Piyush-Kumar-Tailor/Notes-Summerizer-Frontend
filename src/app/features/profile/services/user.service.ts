import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserProfile } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly API = `${environment.apiUrl}/users`;

  getCurrentUser(): Observable<UserProfile> {

    return this.http.get<UserProfile>(`${this.API}/me`);

  }

}