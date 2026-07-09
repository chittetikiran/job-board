import { Component } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories = [
    { name: 'Java', icon: '☕' },
    { name: 'Angular', icon: '🅰' },
    { name: 'React', icon: '⚛' },
    { name: 'Python', icon: '🐍' },
    { name: 'DevOps', icon: '☁' }
  ];

  constructor(private jobService: JobService) {}

  selectCategory(category: string): void {
    this.jobService.searchJobs('', category);
  }
}
