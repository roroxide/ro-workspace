import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component'; // ۱. امپورت مودال جدید

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, KanbanBoardComponent, NewTaskModalComponent,
    CategoriesModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: '../styles.scss'
})
export class AppComponent {
  title = "rotod";
  isSidebarOpen = false;
  isNewTaskModalOpen = false;
  isCategoriesModalOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openNewTaskModal() {
    this.isNewTaskModalOpen = true;
    this.isSidebarOpen = false;
  }

  closeNewTaskModal() {
    this.isNewTaskModalOpen = false;
  }

  openCategoriesModal() { this.isCategoriesModalOpen = true; this.isSidebarOpen = false; }
  closeCategoriesModal() { this.isCategoriesModalOpen = false; }
}