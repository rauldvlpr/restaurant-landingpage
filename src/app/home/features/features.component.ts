import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
  images: string[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  activeFeature: string = 'familiar';
  
  featureCategories = [
    { id: 'familiar', name: 'Área Familiar' },
    { id: 'albercas', name: 'Albercas' },
    { id: 'areasVerdes', name: 'Áreas Verdes' },
    { id: 'cocina', name: 'Cocina Artesanal' }
  ];
  
  features: { [key: string]: Feature } = {
    familiar: {
      icon: 'icon-family',
      title: 'Área Familiar',
      description: 'Espacios amplios y cómodos diseñados para que toda la familia disfrute de momentos agradables juntos. Mesas con capacidad desde 4 hasta 20 personas, áreas infantiles y ambiente acogedor para todas las edades.',
      images: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      ]
    },
    albercas: {
      icon: 'icon-pool',
      title: 'Albercas',
      description: 'Contamos con albercas para todas las edades, donde podrás refrescarte y pasar un día inolvidable. Tenemos áreas poco profundas para niños y zonas más profundas para adultos, todas con vigilancia constante para garantizar su seguridad.',
      images: [
        'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1970&q=80',
        'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1602774895766-5ec4283e203f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      ]
    },
    areasVerdes: {
      icon: 'icon-garden',
      title: 'Áreas Verdes',
      description: 'Hermosos jardines y espacios naturales que te conectan con la tranquilidad del campo. Disfruta de nuestros senderos, zonas de descanso bajo árboles frondosos y el sonido relajante de nuestras fuentes.',
      images: [
        'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1474314170901-f351b68f544f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80'
      ]
    },
    cocina: {
      icon: 'icon-food',
      title: 'Cocina Artesanal',
      description: 'Platillos elaborados con técnicas tradicionales y un toque único que solo encontrarás en nuestro restaurante. Nuestra cocina abierta te permite ver cómo se preparan los alimentos con ingredientes frescos y locales.',
      images: [
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
        'https://images.unsplash.com/photo-1551218372-a8789b81b253?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
        'https://images.unsplash.com/photo-1510431198580-7727c9fa1e3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
      ]
    }
  };
  
  setActiveFeature(feature: string): void {
    this.activeFeature = feature;
  }
}
