import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { MenuComponent } from './menu/menu.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ContactComponent } from './contact/contact.component';
import { SideNavigationComponent } from '../side-navigation/side-navigation.component';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        HeroComponent,
        AboutComponent,
        FeaturesComponent,
        MenuComponent,
        GalleryComponent,
        ContactComponent,
        SideNavigationComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    animations: [
        trigger('sectionAnimation', [
            transition(':enter', [
                query('.animate-item', [
                    style({ opacity: 0, transform: 'translateY(20px)' }),
                    stagger(100, [
                        animate('0.6s ease', style({ opacity: 1, transform: 'translateY(0)' }))
                    ])
                ], { optional: true })
            ])
        ])
    ]
})
export class HomeComponent implements OnInit {
    activeSection: string = 'hero';
    sections = ['hero', 'about', 'features', 'menu', 'gallery', 'contact'];
    
    ngOnInit() {
        // Escuchar el evento scroll cuando se inicializa el componente
        window.addEventListener('scroll', this.checkActiveSection.bind(this));
        // Comprobar la sección activa al inicio
        this.checkActiveSection();
    }
    
    // También podemos usar el decorador @HostListener como alternativa
    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        this.checkActiveSection();
    }
    
    checkActiveSection() {
        // Encontrar qué sección está más visible en la ventana
        const viewportHeight = window.innerHeight;
        const scrollPosition = window.scrollY;
        
        // Recorremos las secciones y determinamos cuál está más visible
        for (const section of this.sections) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrollPosition;
                const elementHeight = rect.height;
                
                // Si el scroll está dentro de la sección
                if (scrollPosition >= elementTop - viewportHeight / 2 && 
                    scrollPosition < elementTop + elementHeight - viewportHeight / 2) {
                    this.activeSection = section;
                    break;
                }
            }
        }
    }
    
    scrollToSection(sectionId: string) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
