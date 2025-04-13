import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'El Jaripeo Campestre';

  constructor(
    private meta: Meta,
    private titleService: Title
  ) {
    this.titleService.setTitle('El Jaripeo Campestre - Restaurante Familiar');
    this.meta.addTags([
      { name: 'description', content: 'Disfruta de auténtica cocina campestre en un ambiente familiar. Albercas, áreas verdes y más.' },
      { property: 'og:title', content: 'El Jaripeo Campestre' },
      // Más tags de Open Graph
    ]);
  }
}