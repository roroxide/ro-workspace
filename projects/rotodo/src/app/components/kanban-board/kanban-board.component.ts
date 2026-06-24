import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService, Task, Category } from '../../services/task.service';
import { FilterToolbarComponent } from '../filter-toolbar/filter-toolbar.component'; // ۱. امپورت کامپوننت فیلتر
import { Subscription } from 'rxjs';
import { TaskEditModalComponent } from '../task-edit-modal/task-edit-modal.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, FilterToolbarComponent, TaskEditModalComponent], // ۲. ثبت در ایمپورت‌ها
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss'
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];
  categories: Category[] = [];

  // متغیرهای فیلتر (که با ساب‌کامپوننت فیلتر بایندینگ دوطرفه دارند)
  searchQuery = '';
  filterUrgent = false;
  filterImportant = false;
  selectedFilterCategoryId = 'all';

  columnVisibility = {
    todo: true,
    doing: true,
    done: true
  };

  private subs = new Subscription();

  // مدیریت وضعیت مودال ادیت تسک
  isEditModalOpen = false;
  selectedTaskToEdit: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.subs.add(this.taskService.todoTasks$.subscribe(tasks => this.todoTasks = tasks));
    this.subs.add(this.taskService.doingTasks$.subscribe(tasks => this.doingTasks = tasks));
    this.subs.add(this.taskService.doneTasks$.subscribe(tasks => this.doneTasks = tasks));
    this.subs.add(this.taskService.categories$.subscribe(cats => this.categories = cats));
  }

  // متد جدید: باز کردن مودال هنگام کلیک روی کارت
  openEditModal(task: Task) {
    this.selectedTaskToEdit = task;
    this.isEditModalOpen = true;
  }

  // متد جدید: بستن مودال بدون اعمال تغییرات
  closeEditModal() {
    this.selectedTaskToEdit = null;
    this.isEditModalOpen = false;
  }

  // متد جدید: ذخیره نهایی تسک ویرایش شده
  saveEditedTask(updatedTask: Task) {
    // در اینجا باید متد به‌روزرسانی تسک را در TaskService خود صدا بزنید.
    // به عنوان مثال:
    // this.taskService.updateTask(updatedTask);
    
    // کدهای موقت در صورتی که مستقیماً در آرایه‌ها تغییر می‌دهید:
    this.updateTaskInLocalArrays(updatedTask);

    this.closeEditModal();
  }

  private updateTaskInLocalArrays(updatedTask: Task) {
    const updateInList = (list: Task[]) => {
      const index = list.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) list[index] = updatedTask;
    };
    updateInList(this.todoTasks);
    updateInList(this.doingTasks);
    updateInList(this.doneTasks);
  }

  shouldShowTask(task: Task): boolean {
    const matchesSearch = !this.searchQuery.trim() || 
      task.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      task.desc.toLowerCase().includes(this.searchQuery.toLowerCase());

    const matchesUrgent = !this.filterUrgent || task.isUrgent;
    const matchesImportant = !this.filterImportant || task.isImportant;
    const matchesCategory = this.selectedFilterCategoryId === 'all' || task.category.id === this.selectedFilterCategoryId;

    return matchesSearch && matchesUrgent && matchesImportant && matchesCategory;
  }

  getFilteredCount(tasks: Task[]): number {
    return tasks.filter(t => this.shouldShowTask(t)).length;
  }

  onTaskDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const movedTask = event.container.data[event.currentIndex];
      movedTask.status = event.container.id === 'doneList' ? 'done' : 
        (event.container.id === 'doingList' ? 'doing' : 'todo');
      this.taskService.updateTask(movedTask)
    }
    // this.taskService.updateTodoTasks([...this.todoTasks]);
    // this.taskService.updateDoingTasks([...this.doingTasks]);
    // this.taskService.updateDoneTasks([...this.doneTasks]);
  }

  ngOnDestroy() { this.subs.unsubscribe(); }
}