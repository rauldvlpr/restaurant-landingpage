import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-navigation.component.html',
  styleUrl: './side-navigation.component.scss'
})
export class SideNavigationComponent {
  @Input() activeSection: string = 'hero';
  @Output() sectionChange = new EventEmitter<string>();
  
  sections = [
    { id: 'hero', label: 'Inicio', icon: 'home' },
    { id: 'about', label: 'Nosotros', icon: 'info' },
    { id: 'features', label: 'Instalaciones', icon: 'pool' },
    { id: 'menu', label: 'Menú', icon: 'restaurant' },
    { id: 'gallery', label: 'Galería', icon: 'photo_library' },
    { id: 'contact', label: 'Contacto', icon: 'email' }
  ];
  
  navigateToSection(sectionId: string) {
    this.sectionChange.emit(sectionId);
  }
}
