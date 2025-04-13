import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MenuCategory {
  name: string;
  items: MenuItem[];
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[]; // Para indicar opciones como vegetariano, picante, etc.
}

@Component({
  selector: 'app-menu-full-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-full-modal.component.html',
  styleUrls: ['./menu-full-modal.component.scss']
})
export class MenuFullModalComponent {
  activeCategory: string = 'entradas';
  
  menuCategories: MenuCategory[] = [
    {
      name: 'Entradas',
      items: [
        // Incluir todos los items de esta categoría
        {
          name: 'Ensalada Campestre',
          description: 'Mezcla de lechugas frescas, tomates orgánicos, queso artesanal, nueces caramelizadas y aderezo de la casa.',
          price: '$120',
          image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        },
        // Más items...
      ]
    },
    // Más categorías...
  ];
  
  constructor() {}
  
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
  
  closeDialog(): void {
    //this.dialogRef.close();
  }
}
