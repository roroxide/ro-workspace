import * as i0 from '@angular/core';
import { Injectable, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

class UiService {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: UiService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: UiService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: UiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: () => [] });

class UiComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: UiComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: UiComponent, isStandalone: true, selector: "lib-ui", ngImport: i0, template: `
    <p>
      ui works!
    </p>
  `, isInline: true, styles: [""] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: UiComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ui', standalone: true, imports: [], template: `
    <p>
      ui works!
    </p>
  ` }]
        }] });

class ToggleSwitchComponent {
    color = '#2563eb';
    size = 'md';
    disabled = false;
    checked = false;
    // EventEmitter برای ارسال وضعیت به والد
    toggleChange = new EventEmitter();
    onToggle(event) {
        if (!this.disabled) {
            const inputElement = event.target;
            this.checked = inputElement.checked;
            this.toggleChange.emit(this.checked);
        }
    }
    get sizeClasses() {
        const sizes = {
            sm: 'w-9 h-5 after:h-4 after:h-4', // اصلاح سایز دایره کوچک
            md: 'w-11 h-6 after:h-5 after:h-5',
            lg: 'w-14 h-7 after:h-6 after:h-6'
        };
        return sizes[this.size];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ToggleSwitchComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: ToggleSwitchComponent, isStandalone: true, selector: "lib-toggle-switch", inputs: { color: "color", size: "size", disabled: "disabled", checked: "checked" }, outputs: { toggleChange: "toggleChange" }, ngImport: i0, template: `
    <label class="relative inline-flex items-center" 
           [class.cursor-pointer]="!disabled" 
           [class.opacity-50]="disabled">
      
      <input type="checkbox" 
             class="sr-only peer" 
             [checked]="checked" 
             [disabled]="disabled"
             (change)="onToggle($event)">
      
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full 
                  peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
           [class]="sizeClasses"
           [style.--toggle-color]="color">
      </div>
    </label>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: ToggleSwitchComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'lib-toggle-switch',
                    standalone: true,
                    imports: [CommonModule],
                    template: `
    <label class="relative inline-flex items-center" 
           [class.cursor-pointer]="!disabled" 
           [class.opacity-50]="disabled">
      
      <input type="checkbox" 
             class="sr-only peer" 
             [checked]="checked" 
             [disabled]="disabled"
             (change)="onToggle($event)">
      
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full 
                  peer peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
           [class]="sizeClasses"
           [style.--toggle-color]="color">
      </div>
    </label>
  `
                }]
        }], propDecorators: { color: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], checked: [{
                type: Input
            }], toggleChange: [{
                type: Output
            }] } });

/*
 * Public API Surface of ui
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ToggleSwitchComponent, UiComponent, UiService };
//# sourceMappingURL=rotodo-ui.mjs.map
