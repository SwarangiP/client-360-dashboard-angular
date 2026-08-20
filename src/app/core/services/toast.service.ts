import { Injectable, signal } from '@angular/core';

export interface Toast {
    id: number;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private nextId = 0;

    readonly toast = signal<Toast | null>(null);

    private timeoutId: ReturnType<typeof setTimeout> | null = null;

    show(message: string, duration = 3000): void {
        const toast: Toast = {
            id: ++this.nextId,
            message
        };

        this.toast.set(toast);

        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.dismiss();
        }, duration);
    }

    dismiss(): void {
        this.toast.set(null);

        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}