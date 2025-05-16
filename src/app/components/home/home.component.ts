import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Item } from '../../models/blog';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  blogs: Item[] | any = [];
  pagedBlogs: Item[] = [];
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions: number[] = [6, 12, 18, 24];
  length = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commonService: CommonService) { }

  ngAfterViewInit(): void {
    this.getBlogPosts();

    setTimeout(() => {
      if(this.blogs?.length == 0) {
        this.blogs = {
          "items": [
            {
              "id": 1,
              "title": "Blog Post 1",
              "blog_image_url": "https://picsum.photos/seed/1/600/400",
              "content": "This is the content of blog post 1. It's filled with insightful information and engaging text.",
              "author": "Bob",
              "category_name": "Travel",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 2,
              "title": "Blog Post 2",
              "blog_image_url": "https://picsum.photos/seed/2/600/400",
              "content": "This is the content of blog post 2. It's filled with insightful information and engaging text.",
              "author": "Charlie",
              "category_name": "Food",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 3,
              "title": "Blog Post 3",
              "blog_image_url": "https://picsum.photos/seed/3/600/400",
              "content": "This is the content of blog post 3. It's filled with insightful information and engaging text.",
              "author": "Diana",
              "category_name": "Health",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 4,
              "title": "Blog Post 4",
              "blog_image_url": "https://picsum.photos/seed/4/600/400",
              "content": "This is the content of blog post 4. It's filled with insightful information and engaging text.",
              "author": "Ethan",
              "category_name": "Finance",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 5,
              "title": "Blog Post 5",
              "blog_image_url": "https://picsum.photos/seed/5/600/400",
              "content": "This is the content of blog post 5. It's filled with insightful information and engaging text.",
              "author": "Alice",
              "category_name": "Tech",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 6,
              "title": "Blog Post 6",
              "blog_image_url": "https://picsum.photos/seed/6/600/400",
              "content": "This is the content of blog post 6. It's filled with insightful information and engaging text.",
              "author": "Bob",
              "category_name": "Travel",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 7,
              "title": "Blog Post 7",
              "blog_image_url": "https://picsum.photos/seed/7/600/400",
              "content": "This is the content of blog post 7. It's filled with insightful information and engaging text.",
              "author": "Charlie",
              "category_name": "Food",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 8,
              "title": "Blog Post 8",
              "blog_image_url": "https://picsum.photos/seed/8/600/400",
              "content": "This is the content of blog post 8. It's filled with insightful information and engaging text.",
              "author": "Diana",
              "category_name": "Health",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 9,
              "title": "Blog Post 9",
              "blog_image_url": "https://picsum.photos/seed/9/600/400",
              "content": "This is the content of blog post 9. It's filled with insightful information and engaging text.",
              "author": "Ethan",
              "category_name": "Finance",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            },
            {
              "id": 10,
              "title": "Blog Post 10",
              "blog_image_url": "https://picsum.photos/seed/10/600/400",
              "content": "This is the content of blog post 10. It's filled with insightful information and engaging text.",
              "author": "Alice",
              "category_name": "Tech",
              "createdAt": "2025-05-16T09:55:04.000Z",
              "updatedAt": "2025-05-16T09:55:04.000Z"
            }
          ],
          "totalItems": 20,
          "totalPages": 2,
          "currentPage": 1,
          "pageSize": 10
        }
      }
    }, 5000);
  }

  getBlogPosts(): void {
    let url = `blogs?page=${this.pageIndex + 1}&pageSize=${this.pageSize}`;
    this.commonService.sendRequest(url, 'GET').subscribe({
      next: (response: any) => {
        this.blogs = response.items;
        this.length = response.totalItems;
      },
      error: (err) => console.error('An error occurred:', err),
      complete: () => console.log('Observable completed')
    });
  }

  getAuthorColor(author: string): string {
    switch (author.toLowerCase()) {
      case 'bob': return 'red';
      case 'charlie': return 'green';
      case 'diana': return 'blue';
      case 'ethan': return 'orange';
      case 'alice': return 'purple';
      default: return 'black';
    }
  }

  getCategoryColor(category: string): string {
    switch (category.toLowerCase()) {
      case 'travel': return '#007bff'; // Bootstrap blue
      case 'food': return '#28a745';   // Bootstrap green
      case 'health': return '#17a2b8'; // Bootstrap cyan
      case 'finance': return '#ffc107'; // Bootstrap yellow
      case 'tech': return '#6f42c1';   // Bootstrap purple
      default: return '#343a40';       // Bootstrap dark
    }
  }



  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getBlogPosts();
  }
}
