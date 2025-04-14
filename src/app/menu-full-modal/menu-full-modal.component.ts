import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  tags?: string[];
}

@Component({
  selector: 'app-menu-full-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FormsModule],
  templateUrl: './menu-full-modal.component.html',
  styleUrls: ['./menu-full-modal.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MenuFullModalComponent implements OnInit {
  activeCategory: string = 'entradas';
  searchTerm: string = '';
  zoomImageUrl: string | null = null; // Para el modal de zoom de imágenes
  
  // Categorías del menú
  menuCategories = [
    { id: 'entradas', name: 'Entradas' },
    { id: 'principales', name: 'Platos Fuertes' },
    { id: 'postres', name: 'Postres' },
    { id: 'bebidas', name: 'Bebidas' },
    { id: 'especialidades', name: 'Especialidades' },
    { id: 'infantil', name: 'Menú Infantil' }
  ];
  
  // Elementos del menú organizados por categoría
  menuItems: {[key: string]: MenuItem[]} = {
    entradas: [
      {
        name: 'Ensalada Campestre',
        description: 'Mezcla de lechugas frescas, tomates orgánicos, queso artesanal, nueces caramelizadas y aderezo de la casa.',
        price: '$120',
        image: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Vegetariano', 'Saludable']
      },
      {
        name: 'Sopa de Calabaza',
        description: 'Deliciosa sopa cremosa de calabaza cultivada en nuestro huerto, con un toque de especias y acompañada de crutones de pan artesanal.',
        price: '$95',
        image: 'https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Caliente']
      },
      {
        name: 'Tabla de Quesos Artesanales',
        description: 'Selección de quesos locales, acompañados de mermeladas caseras, miel de la región y frutos secos.',
        price: '$185',
        image: 'https://images.unsplash.com/photo-1625944525853-74f1ba771877?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Para compartir']
      },
      {
        name: 'Guacamole Tradicional',
        description: 'Preparado al momento en molcajete, con aguacate, tomate, cebolla, cilantro y chile serrano. Acompañado de totopos.',
        price: '$145',
        image: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Vegetariano', 'Picante']
      }
    ],
    principales: [
      {
        name: 'Chamorro al Horno',
        description: 'Cocinado lentamente en nuestro horno de leña, bañado en salsa de chiles y hierbas, servido con puré de papa casero.',
        price: '$245',
        image: 'https://images.unsplash.com/photo-1593030912113-7ffc96895452?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
        tags: ['Especialidad']
      },
      {
        name: 'Costillas BBQ',
        description: 'Costillas de cerdo bañadas en nuestra salsa BBQ casera, acompañadas de elote a la parrilla y ensalada de col.',
        price: '$220',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
        tags: ['Popular']
      },
      {
        name: 'Arrachera Norteña',
        description: 'Arrachera marinada en especias tradicionales, servida con guacamole, frijoles charros y tortillas recién hechas.',
        price: '$260',
        image: 'https://images.unsplash.com/photo-1579366948929-444eb79881eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
        tags: ['Favorito']
      },
      {
        name: 'Chiles Rellenos',
        description: 'Chile poblano relleno de queso, capeado y bañado en salsa de tomate. Servido con arroz y frijoles.',
        price: '$185',
        image: 'https://images.unsplash.com/photo-1563898861748-6ff014c654df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Vegetariano', 'Tradicional']
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
      },
      {
        name: 'Churros con Chocolate',
        price: '$75',
        description: 'Churros recién hechos, espolvoreados con azúcar y canela, acompañados de salsa de chocolate caliente.',
        image: 'https://images.unsplash.com/photo-1624371363536-15a0d55c44a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Para compartir']
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
        image: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        tags: ['Alcohólica']
      },
      {
        name: 'Cerveza Artesanal',
        price: '$85',
        description: 'Selección de cervezas artesanales locales, pregunta por nuestras opciones del día.',
        image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        tags: ['Alcohólica']
      }
    ],
    especialidades: [
      {
        name: 'Molcajete Jaripeo',
        price: '$320',
        description: 'Mezcla de carnes, nopales, cebollas cambray y queso fundido, servido en molcajete caliente con salsa de la casa.',
        image: 'https://images.unsplash.com/photo-1626509653291-21db7cc6aafc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Para compartir', 'Especialidad']
      },
      {
        name: 'Parrillada Especial',
        price: '$450',
        description: 'Selección de cortes de carne, chorizo, pollo, cebollitas y chiles toreados. Ideal para 2-3 personas.',
        image: 'https://images.unsplash.com/photo-1594041680611-7395e0c7a329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        tags: ['Para compartir', 'Especialidad']
      }
    ],
    infantil: [
      {
        name: 'Mini Hamburguesa',
        price: '$95',
        description: 'Hamburguesa de carne de res con queso, acompañada de papas fritas.',
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80',
        tags: ['Infantil']
      },
      {
        name: 'Chicken Fingers',
        price: '$85',
        description: 'Tiras de pollo empanizadas, acompañadas de papas fritas y ensalada.',
        image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
        tags: ['Infantil']
      }
    ]
  };
  
  categoryNames: {[key: string]: string} = {};
  
  constructor(private dialogRef: MatDialogRef<MenuFullModalComponent>) {}
  
  ngOnInit(): void {
    // Crear un mapeo de id -> nombre
    this.menuCategories.forEach(category => {
      this.categoryNames[category.id] = category.name;
    });
  }
  
  setActiveCategory(category: string): void {
    this.activeCategory = category;
    // Cerrar cualquier zoom de imagen abierto al cambiar de categoría
    this.zoomImageUrl = null;
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }
  
  // Método para obtener el nombre de la categoría activa
  getActiveCategoryName(): string {
    const category = this.menuCategories.find(cat => cat.id === this.activeCategory);
    return category ? category.name : '';
  }
  
  // Métodos para el zoom de imágenes
  openImageZoom(imageUrl: string): void {
    this.zoomImageUrl = imageUrl;
  }
  
  closeImageZoom(event?: Event): void {
    if (event) {
      event.stopPropagation(); // Evitar que el clic se propague
    }
    this.zoomImageUrl = null;
  }
}
