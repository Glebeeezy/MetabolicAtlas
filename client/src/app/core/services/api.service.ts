import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EnzymeDetail,
  MapLayoutDetail,
  MapLayoutSummary,
  MetaboliteDetail,
  PathwayDetail,
  PathwaySummary,
  ReactionDetail,
} from '../models';

/**
 * Core API service providing typed access to the Metabolic Atlas REST API.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/v1';

  getHealth(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>('/health');
  }

  getLayouts(): Observable<MapLayoutSummary[]> {
    return this.http.get<MapLayoutSummary[]>(`${this.baseUrl}/atlas/layouts`);
  }

  getLayout(id: string): Observable<MapLayoutDetail> {
    return this.http.get<MapLayoutDetail>(`${this.baseUrl}/atlas/layouts/${id}`);
  }

  getPathways(): Observable<PathwaySummary[]> {
    return this.http.get<PathwaySummary[]>(`${this.baseUrl}/pathways`);
  }

  getPathway(id: string): Observable<PathwayDetail> {
    return this.http.get<PathwayDetail>(`${this.baseUrl}/pathways/${id}`);
  }

  getMetabolite(id: string, lang?: string): Observable<MetaboliteDetail> {
    let params = new HttpParams();
    if (lang) {
      params = params.set('lang', lang);
    }
    return this.http.get<MetaboliteDetail>(`${this.baseUrl}/metabolites/${id}`, { params });
  }

  getReaction(id: string, lang?: string): Observable<ReactionDetail> {
    let params = new HttpParams();
    if (lang) {
      params = params.set('lang', lang);
    }
    return this.http.get<ReactionDetail>(`${this.baseUrl}/reactions/${id}`, { params });
  }

  getEnzymes(): Observable<EnzymeDetail[]> {
    return this.http.get<EnzymeDetail[]>(`${this.baseUrl}/enzymes`);
  }

  getEnzyme(id: string): Observable<EnzymeDetail> {
    return this.http.get<EnzymeDetail>(`${this.baseUrl}/enzymes/${id}`);
  }
}

