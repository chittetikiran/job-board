import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  highlights = [
    {
      title: 'Top Tech Roles',
      description: 'Discover high-growth roles in frontend, backend, AI, and DevOps.'
    },
    {
      title: 'Fast Applications',
      description: 'Apply in minutes with streamlined profiles and smart recommendations.'
    },
    {
      title: 'Trusted Employers',
      description: 'Work with innovative companies hiring globally every week.'
    }
  ];
}
