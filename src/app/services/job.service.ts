import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobs: any[] = [];
  private jobsRequest$?: Observable<any[]>;
  private filteredJobsSubject = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  getJobs(): Observable<any[]> {
    if (!this.jobsRequest$) {
      this.jobsRequest$ = this.http.get<any[]>('assets/jobs.json').pipe(
        tap((jobs) => {
          this.jobs = jobs;
          this.filteredJobsSubject.next(jobs);
        }),
        shareReplay(1)
      );
    }
    return this.jobsRequest$;
  }

  getFilteredJobs(): Observable<any[]> {
    return this.filteredJobsSubject.asObservable();
  }

  searchJobs(query: string, category: string): void {
    const normalizedQuery = query.trim().toLowerCase();

    if (!this.jobs.length) {
      this.getJobs().subscribe(() => this.searchJobs(query, category));
      return;
    }

    const filtered = this.jobs.filter((job) => {
      const matchesQuery = !normalizedQuery ||
        job.title.toLowerCase().includes(normalizedQuery) ||
        job.company.toLowerCase().includes(normalizedQuery) ||
        job.location.toLowerCase().includes(normalizedQuery) ||
        (job.skills || []).some((skill: string) => skill.toLowerCase().includes(normalizedQuery));

      const matchesCategory = category === 'All Categories' || (job.skills || []).includes(category);
      return matchesQuery && matchesCategory;
    });

    this.filteredJobsSubject.next(filtered);
  }
}