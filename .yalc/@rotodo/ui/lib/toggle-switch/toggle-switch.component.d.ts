import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ToggleSwitchComponent {
    color: string;
    size: 'sm' | 'md' | 'lg';
    disabled: boolean;
    checked: boolean;
    toggleChange: EventEmitter<boolean>;
    onToggle(event: Event): void;
    get sizeClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleSwitchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleSwitchComponent, "lib-toggle-switch", never, { "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; }, { "toggleChange": "toggleChange"; }, never, never, true, never>;
}
