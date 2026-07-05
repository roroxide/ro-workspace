import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class ToggleSwitchComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLXN3aXRjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy91aS9zcmMvbGliL3RvZ2dsZS1zd2l0Y2gvdG9nZ2xlLXN3aXRjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBNEIvQyxNQUFNLE9BQU8scUJBQXFCO0lBQ3ZCLEtBQUssR0FBVyxTQUFTLENBQUM7SUFDMUIsSUFBSSxHQUF1QixJQUFJLENBQUM7SUFDaEMsUUFBUSxHQUFZLEtBQUssQ0FBQztJQUMxQixPQUFPLEdBQVksS0FBSyxDQUFDO0lBRWxDLHdDQUF3QztJQUM5QixZQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztJQUVyRCxRQUFRLENBQUMsS0FBWTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUEwQixDQUFDO1lBQ3RELElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUNwQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixNQUFNLEtBQUssR0FBRztZQUNaLEVBQUUsRUFBRSw2QkFBNkIsRUFBRSx3QkFBd0I7WUFDM0QsRUFBRSxFQUFFLDhCQUE4QjtZQUNsQyxFQUFFLEVBQUUsOEJBQThCO1NBQ25DLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQzt3R0F4QlUscUJBQXFCOzRGQUFyQixxQkFBcUIsNE1BdEJ0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQsMkRBckJTLFlBQVk7OzRGQXVCWCxxQkFBcUI7a0JBMUJqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQlQ7aUJBQ0Y7OEJBRVUsS0FBSztzQkFBYixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFHSSxZQUFZO3NCQUFyQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi10b2dnbGUtc3dpdGNoJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGxhYmVsIGNsYXNzPVwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyXCIgXG4gICAgICAgICAgIFtjbGFzcy5jdXJzb3ItcG9pbnRlcl09XCIhZGlzYWJsZWRcIiBcbiAgICAgICAgICAgW2NsYXNzLm9wYWNpdHktNTBdPVwiZGlzYWJsZWRcIj5cbiAgICAgIFxuICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFxuICAgICAgICAgICAgIGNsYXNzPVwic3Itb25seSBwZWVyXCIgXG4gICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIFxuICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgKGNoYW5nZSk9XCJvblRvZ2dsZSgkZXZlbnQpXCI+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3M9XCJ3LTExIGgtNiBiZy1ncmF5LTIwMCBwZWVyLWZvY3VzOm91dGxpbmUtbm9uZSByb3VuZGVkLWZ1bGwgXG4gICAgICAgICAgICAgICAgICBwZWVyIHBlZXItY2hlY2tlZDphZnRlcjp0cmFuc2xhdGUteC1mdWxsIHBlZXItY2hlY2tlZDphZnRlcjpib3JkZXItd2hpdGUgXG4gICAgICAgICAgICAgICAgICBhZnRlcjpjb250ZW50LVsnJ10gYWZ0ZXI6YWJzb2x1dGUgYWZ0ZXI6dG9wLVsycHhdIGFmdGVyOmxlZnQtWzJweF0gXG4gICAgICAgICAgICAgICAgICBhZnRlcjpiZy13aGl0ZSBhZnRlcjpib3JkZXItZ3JheS0zMDAgYWZ0ZXI6Ym9yZGVyIGFmdGVyOnJvdW5kZWQtZnVsbCBcbiAgICAgICAgICAgICAgICAgIGFmdGVyOmgtNSBhZnRlcjp3LTUgYWZ0ZXI6dHJhbnNpdGlvbi1hbGwgcGVlci1jaGVja2VkOmJnLWJsdWUtNjAwXCJcbiAgICAgICAgICAgW2NsYXNzXT1cInNpemVDbGFzc2VzXCJcbiAgICAgICAgICAgW3N0eWxlLi0tdG9nZ2xlLWNvbG9yXT1cImNvbG9yXCI+XG4gICAgICA8L2Rpdj5cbiAgICA8L2xhYmVsPlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZVN3aXRjaENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgPSAnIzI1NjNlYic7XG4gIEBJbnB1dCgpIHNpemU6ICdzbScgfCAnbWQnIHwgJ2xnJyA9ICdtZCc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvLyBFdmVudEVtaXR0ZXIg2KjYsdin24wg2KfYsdiz2KfZhCDZiNi22LnbjNiqINio2Ycg2YjYp9mE2K9cbiAgQE91dHB1dCgpIHRvZ2dsZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICBvblRvZ2dsZShldmVudDogRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgdGhpcy5jaGVja2VkID0gaW5wdXRFbGVtZW50LmNoZWNrZWQ7XG4gICAgICB0aGlzLnRvZ2dsZUNoYW5nZS5lbWl0KHRoaXMuY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNpemVDbGFzc2VzKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2l6ZXMgPSB7XG4gICAgICBzbTogJ3ctOSBoLTUgYWZ0ZXI6aC00IGFmdGVyOmgtNCcsIC8vINin2LXZhNin2K0g2LPYp9uM2LIg2K/Yp9uM2LHZhyDaqdmI2obaqVxuICAgICAgbWQ6ICd3LTExIGgtNiBhZnRlcjpoLTUgYWZ0ZXI6aC01JyxcbiAgICAgIGxnOiAndy0xNCBoLTcgYWZ0ZXI6aC02IGFmdGVyOmgtNidcbiAgICB9O1xuICAgIHJldHVybiBzaXplc1t0aGlzLnNpemVdO1xuICB9XG59XG5cbi8qKlxuICogSG93IHRvIHVzZVxuIFxuaGFuZGxlVG9nZ2xlKHN0YXR1czogYm9vbGVhbikge1xuICB0aGlzLmlzV2FsbGV0RW5hYmxlZCA9IHN0YXR1cztcbn1cblxuICovIl19