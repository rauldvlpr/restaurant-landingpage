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
    activeSection: string = 'hero';
    isMobileMenuOpen: boolean = false;
    
    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isScrolled = window.scrollY > 50;
        this.updateActiveSection();
    }
    
    updateActiveSection() {
        const sections = ['hero', 'about', 'features', 'menu', 'gallery', 'contact'];
        
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
    
    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.isMobileMenuOpen = false;
        document.body.style.overflow = '';
    }
}
