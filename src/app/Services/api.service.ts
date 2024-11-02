import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl="https://localhost:44363/api/User/all/";
  private baseUrl1="https://localhost:44363/api/User/";
  constructor(private http:HttpClient) { }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl1}Delete/${id}`, { responseType: 'text' });
  }
  updateUser(id: number, user: any): Observable<any> {
    console.log(`Updating user with id ${id}`);
    return this.http.put(`${this.baseUrl1}update/${id}`, user, { responseType: 'text' }).pipe(
        tap(
            data => console.log('Update Success:', data),
            error => console.error('Update Error:', error)
        )
    );
}

}
