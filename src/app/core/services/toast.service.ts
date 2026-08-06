import { Injectable, signal } from '@angular/core';

export interface Toast {

  id: number;

  message: string;

  type: 'success' | 'error' | 'warning' | 'info';

}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  readonly toasts = signal<Toast[]>([]);

  show(
    message: string,
    type: Toast['type'] = 'info'
  ): void {

    const toast: Toast = {

      id: Date.now(),

      message,

      type

    };

    this.toasts.update(value => [...value, toast]);

    setTimeout(() => {

      this.remove(toast.id);

    }, 3000);

  }

  remove(id: number): void {

    this.toasts.update(value =>
      value.filter(t => t.id !== id)
    );

  }

}