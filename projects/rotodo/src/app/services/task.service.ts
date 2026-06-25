import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  rawColor: string;
}

export interface Task {
  id: number;
  category: Category;
  title: string;
  desc: string;
  isUrgent: boolean;
  isImportant: boolean;
  status: TaskStatus;
}

export type TaskStatus = 'todo' | 'doing' | 'done';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private CATEGORIES_STORAGE_KEY = 'rotodo_categories';
  private TASKS_STORAGE_KEY = 'rotodo_tasks';

  private defaultCategories = [
    { 
      id: 'none', 
      name: 'بدون دسته‌بندی',
      rawColor: '#9ca3af' // معادل gray-400
    },
    { 
      id: 'company', 
      name: 'شرکت',
      rawColor: '#dc2626' // معادل red-600
    },
    { 
      id: 'personal', 
      name: 'شخصی', 
      rawColor: '#4f46e5' // معادل indigo-600
    },
    { 
      id: 'home', 
      name: 'خانه', 
      rawColor: '#059669' // معادل emerald-600
    }
  ];

  private defaultTasks: Task[] = [
    { 
      id: 1, 
      category: this.defaultCategories[1], 
      title: 'طراحی داکیومنت معماری پروژه', 
      desc: 'نیازمندی‌های فنی ساختار فرانت‌اند انگولار و ابزارهای استیت منیجمنت باید مستند شوند.',
      isUrgent: true,
      isImportant: true,
      status: 'todo'
    },
    { 
      id: 2, 
      category: this.defaultCategories[2], 
      title: 'کدنویسی قالب اصلی بورد کامپوننت', 
      desc: 'پیاده‌سازی استایل و ساختار منوی کناری، هدر و گرید ۳ ستونه کانبان با استفاده از Tailwind.',
      isUrgent: true,
      isImportant: false,
      status: 'doing'
    },
    { 
      id: 3, 
      category: this.defaultCategories[3], 
      title: 'خرید اقلام هفتگی خانه', 
      desc: 'تهیه لیست خرید و مراجعه به فروشگاه زنجیره‌ای برای لوازم مصرفی آشپزخانه.', 
      isUrgent: false,
      isImportant: false,
      status: 'done'
    }
  ]

  // تعریف اولیه دسته‌بندی‌ها
  private categoriesSubject = new BehaviorSubject<Category[]>(this.loadCategoriesFromStorage());
  categories$ = this.categoriesSubject.asObservable();

  private initTasks = this.loadTasksFromStorage();
  private tasksSubject = new BehaviorSubject<Task[]>(this.initTasks);
  tasks$ = this.tasksSubject.asObservable();

  todoTasks$ = this.getTasksByStatus('todo');
  doingTasks$ = this.getTasksByStatus('doing');
  doneTasks$ = this.getTasksByStatus('done');

  getTasksByStatus(status: 'todo' | 'doing' | 'done') {
    return this.tasks$.pipe(
      map(tasks => tasks.filter(t => t.status === status))
    );
  }
  
  // ذخیره اطلاعات در مرورگر
  private saveCategoriesToStorage(cats: Category[]) {
    localStorage.setItem(this.CATEGORIES_STORAGE_KEY, JSON.stringify(cats));
  }
  
  private saveTasksToStorage(tasks: Task[]) {
    localStorage.setItem(this.TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }
  
  // لود اطلاعات از مرورگر
  private loadCategoriesFromStorage(): Category[] {
    const saved = localStorage.getItem(this.CATEGORIES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.defaultCategories;
  }
  
  // لود اطلاعات از مرورگر
  private loadTasksFromStorage(): Task[] {
    const saved = localStorage.getItem(this.TASKS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.defaultTasks;
  }

  // متد ویرایش دسته‌بندی (حالا بسیار ساده‌تر و بهینه‌تر از قبل عمل می‌کند)
  updateCategory(updatedCat: Category) {
    // ۱. آپدیت لیست اصلی دسته‌بندی‌ها
    const categories = this.categoriesSubject.value.map(cat => 
      cat.id === updatedCat.id ? updatedCat : cat
    );
    this.categoriesSubject.next(categories);
    this.saveCategoriesToStorage(categories);

    // ۲. به‌روزرسانی کارت‌های روی بورد بر اساس آبجکت جدید دسته‌بندی
    this.tasksSubject.next(this.updateTaskArrayCategory(this.tasksSubject.value, updatedCat));
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
  addTask(taskData: Omit<Task, 'id' | 'category'>, categoryObj: Category) {
    const newTask: Task = {
      ...taskData,
      id: Date.now(),
      category: categoryObj
    };

    const updated = [...this.tasksSubject.value, newTask];
    this.tasksSubject.next(updated);
    this.saveTasksToStorage(updated);
  }

  updateTask(task: Task) {
    const tasks = this.tasksSubject.value.map(_task => _task.id === task.id ? {...task} : _task);
    this.tasksSubject.next(tasks);
    this.saveTasksToStorage(tasks);
  }

  // updateTodoTasks(tasks: Task[]) { this.todoTasksSubject.next(tasks); }
  // updateDoingTasks(tasks: Task[]) { this.doingTasksSubject.next(tasks); }
  // updateDoneTasks(tasks: Task[]) { this.doneTasksSubject.next(tasks); }

  addCategory(newCat: Category) {
    const currentCats = this.categoriesSubject.value;
    const updated = [...currentCats, newCat];
    this.categoriesSubject.next(updated);
    this.saveCategoriesToStorage(updated);
  }

  // در TaskService
  clearAllData() {
    // پاک کردن از لوکال استوریج
    localStorage.removeItem(this.CATEGORIES_STORAGE_KEY);
    localStorage.removeItem(this.TASKS_STORAGE_KEY);
    
    // ریست کردن BehaviorSubjectها برای آپدیت فوری در برنامه
    this.categoriesSubject.next([]);
    this.saveCategoriesToStorage([]);
    this.tasksSubject.next([]);
    this.saveTasksToStorage([]);
    
    // اختیاری: می‌توانید صفحه را رفرش کنید تا اپلیکیشن کاملاً به حالت اولیه برگردد
    // window.location.reload();
  }
}