import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    isScrolled: boolean = false;
    activeSection: string = 'home';
    
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 50;
        this.updateActiveSection();
    }
    
    updateActiveSection() {
        const sections = ['home', 'about', 'features', 'menu', 'gallery', 'contact'];
        
        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Si la sección está visible en el viewport
                if (rect.top <= 150 && rect.bottom >= 150) {
                    this.activeSection = section;
                    break;
                }
            }
        }
    }
}
