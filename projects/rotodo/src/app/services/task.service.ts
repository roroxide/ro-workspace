import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  color: string;
  bg: string;
  rawColor: string;
}

export interface Task {
  id: number;
  category: Category;
  title: string;
  desc: string;
  isUrgent: boolean;
  isImportant: boolean;
  isDone?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // تعریف اولیه دسته‌بندی‌ها
  private categoriesSubject = new BehaviorSubject<Category[]>([
    { id: 'none', name: 'بدون دسته‌بندی', color: 'text-gray-600', bg: 'bg-gray-50', rawColor: 'bg-gray-400' },
    { id: 'company', name: 'شرکت', color: 'text-red-600', bg: 'bg-red-50', rawColor: 'bg-red-500' },
    { id: 'personal', name: 'شخصی', color: 'text-indigo-600', bg: 'bg-indigo-50', rawColor: 'bg-indigo-500' },
    { id: 'home', name: 'خانه', color: 'text-emerald-600', bg: 'bg-emerald-50', rawColor: 'bg-emerald-500' }
  ]);

  categories$ = this.categoriesSubject.asObservable();

  // داده‌های اولیه بورد با ساختار جدید آبجکتی
  private todoTasksSubject = new BehaviorSubject<Task[]>([
    { 
      id: 1, 
      category: { id: 'company', name: 'شرکت', color: 'text-red-600', bg: 'bg-red-50', rawColor: 'bg-red-500' }, 
      title: 'طراحی داکیومنت معماری پروژه', 
      desc: 'نیازمندی‌های فنی ساختار فرانت‌اند انگولار و ابزارهای استیت منیجمنت باید مستند شوند.',
      isUrgent: true,
      isImportant: true
    }
  ]);
  
  private doingTasksSubject = new BehaviorSubject<Task[]>([
    { 
      id: 2, 
      category: { id: 'personal', name: 'شخصی', color: 'text-indigo-600', bg: 'bg-indigo-50', rawColor: 'bg-indigo-500' }, 
      title: 'کدنویسی قالب اصلی بورد کامپوننت', 
      desc: 'پیاده‌سازی استایل و ساختار منوی کناری، هدر و گرید ۳ ستونه کانبان با استفاده از Tailwind.',
      isUrgent: true,
      isImportant: false
    }
  ]);

  private doneTasksSubject = new BehaviorSubject<Task[]>([
    { 
      id: 3, 
      category: { id: 'home', name: 'خانه', color: 'text-emerald-600', bg: 'bg-emerald-50', rawColor: 'bg-emerald-500' }, 
      title: 'خرید اقلام هفتگی خانه', 
      desc: 'تهیه لیست خرید و مراجعه به فروشگاه زنجیره‌ای برای لوازم مصرفی آشپزخانه.', 
      isUrgent: false,
      isImportant: false,
      isDone: true 
    }
  ]);

  todoTasks$ = this.todoTasksSubject.asObservable();
  doingTasks$ = this.doingTasksSubject.asObservable();
  doneTasks$ = this.doneTasksSubject.asObservable();

  // متد ویرایش دسته‌بندی (حالا بسیار ساده‌تر و بهینه‌تر از قبل عمل می‌کند)
  updateCategory(updatedCat: Category) {
    // ۱. آپدیت لیست اصلی دسته‌بندی‌ها
    const categories = this.categoriesSubject.value.map(cat => 
      cat.id === updatedCat.id ? updatedCat : cat
    );
    this.categoriesSubject.next(categories);

    // ۲. به‌روزرسانی کارت‌های روی بورد بر اساس آبجکت جدید دسته‌بندی
    this.todoTasksSubject.next(this.updateTaskArrayCategory(this.todoTasksSubject.value, updatedCat));
    this.doingTasksSubject.next(this.updateTaskArrayCategory(this.doingTasksSubject.value, updatedCat));
    this.doneTasksSubject.next(this.updateTaskArrayCategory(this.doneTasksSubject.value, updatedCat));
  }

  // متد کمکی برای اصلاح ارجاع آبجکت دسته‌بندی درون کارت‌ها
  private updateTaskArrayCategory(tasks: Task[], updatedCat: Category): Task[] {
    return tasks.map(task => {
      if (task.category.id === updatedCat.id) {
        return { ...task, category: updatedCat }; // جایگزینی کل آبجکت به‌روز شده
      }
      return task;
    });
  }

  // اصلاح متد اضافه کردن کار جدید
  addTask(taskData: Omit<Task, 'id' | 'category'>, categoryObj: Category, statusId: string) {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      category: categoryObj,
      isDone: statusId === 'done'
    };

    if (statusId === 'done') {
      this.doneTasksSubject.next([...this.doneTasksSubject.value, newTask]);
    } else if (statusId === 'doing') {
      this.doingTasksSubject.next([...this.doingTasksSubject.value, newTask]);
    } else {
      this.todoTasksSubject.next([...this.todoTasksSubject.value, newTask]);
    }
  }

  updateTodoTasks(tasks: Task[]) { this.todoTasksSubject.next(tasks); }
  updateDoingTasks(tasks: Task[]) { this.doingTasksSubject.next(tasks); }
  updateDoneTasks(tasks: Task[]) { this.doneTasksSubject.next(tasks); }
}