import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  searchTerm = '';
  selectedCategory = 'All Categories';
  categories: string[] = ['All Categories'];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((jobs) => {
      const categorySet = new Set<string>();
      jobs.forEach((job: any) => {
        (job.skills || []).forEach((skill: string) => categorySet.add(skill));
      });
      this.categories = ['All Categories', ...Array.from(categorySet).sort()];
    });
  }

  onSearch(): void {
    this.jobService.searchJobs(this.searchTerm, this.selectedCategory);
  }
}
