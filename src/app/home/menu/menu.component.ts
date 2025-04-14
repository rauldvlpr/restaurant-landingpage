import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuFullModalComponent } from '../../menu-full-modal/menu-full-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


interface MenuItem {
  name: string;
  price: string;
  description: string;
  image: string;
}

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MatDialogModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {
  activeCategory: string = 'entradas';
  
  menuCategories = [
    { id: 'entradas', name: 'Entradas' },
    { id: 'principales', name: 'Platos Fuertes' },
    { id: 'postres', name: 'Postres' },
    { id: 'bebidas', name: 'Bebidas' }
  ];
  
  menuItems: { [key: string]: MenuItem[] } = {
    entradas: [
      {
        name: 'Ensalada Campestre',
        price: '$120',
        description: 'Mezcla de lechugas frescas, tomates orgánicos, queso artesanal, nueces caramelizadas y aderezo de la casa.',
        image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        name: 'Sopa de Calabaza',
        price: '$95',
        description: 'Deliciosa sopa cremosa de calabaza cultivada en nuestro huerto, con un toque de especias y acompañada de crutones de pan artesanal.',
        image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        name: 'Tabla de Quesos Artesanales',
        price: '$185',
        description: 'Selección de quesos locales, acompañados de mermeladas caseras, miel de la región y frutos secos.',
        image: 'https://images.unsplash.com/photo-1625944525853-74f1ba771877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      }
    ],
    principales: [
      {
        name: 'Chamorro al Horno',
        price: '$245',
        description: 'Cocinado lentamente en nuestro horno de leña, bañado en salsa de chiles y hierbas, servido con puré de papa casero.',
        image: 'https://images.unsplash.com/photo-1593030912113-7ffc96895452?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
      },
      {
        name: 'Costillas BBQ',
        price: '$220',
        description: 'Costillas de cerdo bañadas en nuestra salsa BBQ casera, acompañadas de elote a la parrilla y ensalada de col.',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
      },
      {
        name: 'Arrachera Norteña',
        price: '$260',
        description: 'Arrachera marinada en especias tradicionales, servida con guacamole, frijoles charros y tortillas recién hechas.',
        image: 'https://images.unsplash.com/photo-1579366948929-444eb79881eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
      }
    ],
    postres: [
      {
        name: 'Flan de Cajeta',
        price: '$85',
        description: 'Suave y cremoso flan casero, bañado en cajeta artesanal y decorado con nueces.',
        image: 'https://images.unsplash.com/photo-1602663491496-73f07481dbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      },
      {
        name: 'Pastel de Tres Leches',
        price: '$90',
        description: 'Esponjoso bizcocho empapado en tres tipos de leche, decorado con crema batida y frutas frescas.',
        image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
      }
    ],
    bebidas: [
      {
        name: 'Agua de Jamaica',
        price: '$45',
        description: 'Refrescante agua de Jamaica preparada con flores de hibisco, endulzada con azúcar orgánica.',
        image: 'https://images.unsplash.com/photo-1575596510825-f748919a2bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      },
      {
        name: 'Margarita Jaripeo',
        price: '$120',
        description: 'Nuestra margarita especial con tequila reposado, jugo de limón fresco y un toque de chile para darle ese sabor único.',
        image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      },
      {
        name: 'Cerveza Artesanal',
        price: '$85',
        description: 'Selección de cervezas artesanales locales, pregunta por nuestras opciones del día.',
        image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      }
    ]
  };
  
  constructor(private dialog: MatDialog) {}
  
  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }
  
  openFullMenu(): void {
    this.dialog.open(MenuFullModalComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '90vh',
      width: '90vw',
      panelClass: 'full-menu-dialog'
    });
  }
}
