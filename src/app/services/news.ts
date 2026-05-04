import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NdsuEvent {
  id: string;
  name: string;
  description: string;
  organizationName: string;
  location: string | null;
  startsOn: string;
  endsOn: string;
  theme: string | null;
  categoryNames: string[];
  rsvpTotal: number;
}

interface EventSearchResponse {
  value: NdsuEvent[];
}

@Injectable({
  providedIn: 'root',
})
export class News {
  private readonly apiUrl = '/api/events';

  constructor(private readonly http: HttpClient) {}

  getEvents(take = 15): Observable<EventSearchResponse> {
    const endsAfter = new Date();
    endsAfter.setMonth(endsAfter.getMonth() + 1);

    const params = new HttpParams()
      .set('endsAfter', endsAfter.toISOString())
      .set('status', 'Approved')
      .set('take', take.toString())
      .set('query', '');

    return this.http.get<EventSearchResponse>(this.apiUrl, { params });
  }
}
