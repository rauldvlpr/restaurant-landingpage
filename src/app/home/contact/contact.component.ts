import { Component, OnInit, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  formSuccess = false;
  formError = false;
  
  // Variables para la sección "Cómo Llegar"
  originAddress: string = '';
  restaurantAddress: string = 'El Jaripeo Campestre, Carretera Nacional, Cuernavaca, Morelos';
  selectedMode: string = 'car';
  isLoadingMap: boolean = true;
  routeInfo: any = null;
  
  transportModes = [
    { label: 'Auto', value: 'car', icon: 'icon-car' },
    { label: 'Caminando', value: 'foot', icon: 'icon-walk' },
    { label: 'Bicicleta', value: 'bike', icon: 'icon-bike' },
    { label: 'Transporte', value: 'bus', icon: 'icon-bus' }
  ];
  
  private map: any = null;
  private routingControl: any = null;
  private restaurantMarker: any = null;
  private restaurantLocation = { lat: 18.796768687267705, lng: -99.10292387479878 };
  private isBrowser: boolean;
  private L: any;
  
  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/)
      ]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  async ngOnInit() {
    if (this.isBrowser) {
      await this.loadLeaflet();
    }
  }

  private async loadLeaflet() {
    if (!this.isBrowser) return;

    try {
      // Cargar los estilos de Leaflet
      const leafletStyles = document.createElement('link');
      leafletStyles.rel = 'stylesheet';
      leafletStyles.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(leafletStyles);

      // Cargar los estilos de Leaflet Routing Machine
      const routingStyles = document.createElement('link');
      routingStyles.rel = 'stylesheet';
      routingStyles.href = 'https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css';
      document.head.appendChild(routingStyles);

      // Cargar los módulos
      const leafletModule = await import('leaflet');
      const leafletRoutingModule = await import('leaflet-routing-machine');
      
      this.L = leafletModule.default;
      
      // Configurar el ícono por defecto
      const DefaultIcon = this.L.icon({
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      });
      
      this.L.Marker.prototype.options.icon = DefaultIcon;

      // Inicializar el mapa después de cargar los estilos
      setTimeout(() => {
        this.initMap();
      }, 100);
    } catch (error) {
      console.error('Error loading Leaflet:', error);
    }
  }
  
  private initMap() {
    if (!this.isBrowser || !this.L) return;

    try {
      // Inicializa el mapa
      this.map = this.L.map('mapDirections', {
        center: [this.restaurantLocation.lat, this.restaurantLocation.lng],
        zoom: 15,
        zoomControl: true,
        attributionControl: true,
        scrollWheelZoom: true
      });
      
      // Añade el tile layer de OpenStreetMap
      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);
      
      // Añade el marcador del restaurante
      const restaurantIcon = this.L.icon({
        iconUrl: 'assets/images/marker-restaurant.png',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });
      
      this.restaurantMarker = this.L.marker([this.restaurantLocation.lat, this.restaurantLocation.lng], {
        icon: restaurantIcon
      }).addTo(this.map);
      
      this.restaurantMarker.bindPopup('El Jaripeo Campestre').openPopup();
      
      // Inicializa el control de rutas
      this.routingControl = this.L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        lineOptions: {
          styles: [{ color: '#e62e2e', weight: 5 }]
        },
        createMarker: () => null,
        router: this.L.Routing.osrmv1({
          serviceUrl: 'https://router.project-osrm.org/route/v1'
        })
      }).addTo(this.map);

      // Escuchar eventos de la ruta
      this.routingControl.on('routesfound', (e: any) => {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const route = routes[0];
          this.routeInfo = {
            distance: this.formatDistance(route.summary.totalDistance),
            duration: this.formatDuration(route.summary.totalTime),
            steps: this.formatRouteSteps(route.instructions)
          };
        }
        this.isLoadingMap = false;
      });

      this.routingControl.on('routingerror', (e: any) => {
        console.error('Error en el cálculo de la ruta:', e);
        this.isLoadingMap = false;
        alert('No se pudo calcular la ruta. Por favor intenta nuevamente.');
      });

      // Forzar un resize del mapa
      setTimeout(() => {
        this.map.invalidateSize();
      }, 200);
      
      this.isLoadingMap = false;
    } catch (error) {
      console.error('Error initializing map:', error);
      this.isLoadingMap = false;
    }
  }
  
  detectUserLocation() {
    if (!this.isBrowser) return;
    
    if (navigator.geolocation) {
      this.isLoadingMap = true;
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Convertir coordenadas a dirección legible usando Nominatim
          this.reverseGeocode(pos);
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
          this.isLoadingMap = false;
          alert('No se pudo obtener tu ubicación. Por favor ingresa tu dirección manualmente.');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización. Por favor ingresa tu dirección manualmente.');
    }
  }
  
  private reverseGeocode(location: { lat: number, lng: number }) {
    if (!this.isBrowser) return;

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`)
      .then(response => response.json())
      .then(data => {
        this.isLoadingMap = false;
        this.originAddress = data.display_name;
        if (this.map) {
          this.map.setView([location.lat, location.lng], 15);
        }
      })
      .catch(error => {
        console.error('Error en la geocodificación inversa:', error);
        this.isLoadingMap = false;
        alert('No se pudo convertir tus coordenadas a una dirección legible.');
      });
  }
  
  setTransportMode(mode: string) {
    this.selectedMode = mode;
  }
  
  calculateRoute() {
    if (!this.isBrowser) return;
    
    if (!this.originAddress) {
      alert('Por favor ingresa tu ubicación de origen.');
      return;
    }
    
    this.isLoadingMap = true;
    this.routeInfo = null;
    
    // Geocodificar la dirección de origen
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.originAddress)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const origin: [number, number] = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          const destination: [number, number] = [this.restaurantLocation.lat, this.restaurantLocation.lng];
          
          if (this.routingControl) {
            // Limpiar ruta anterior
            this.routingControl.setWaypoints([]);
            
            // Establecer nuevos waypoints
            this.routingControl.setWaypoints([
              this.L.latLng(origin[0], origin[1]),
              this.L.latLng(destination[0], destination[1])
            ]);

            // Ajustar el mapa para mostrar toda la ruta
            this.map?.fitBounds(this.L.latLngBounds([
              [origin[0], origin[1]],
              [destination[0], destination[1]]
            ]), { padding: [50, 50] });
          }
        } else {
          this.isLoadingMap = false;
          alert('No se pudo encontrar la dirección de origen.');
        }
      })
      .catch(error => {
        console.error('Error en la geocodificación:', error);
        this.isLoadingMap = false;
        alert('Error al calcular la ruta. Por favor intenta nuevamente.');
      });
  }
  
  private formatDistance(meters: number): string {
    if (meters >= 1000) {
      return `${(meters / 1000).toFixed(1)} km`;
    }
    return `${Math.round(meters)} m`;
  }
  
  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} h ${minutes} min`;
    }
    return `${minutes} min`;
  }
  
  private formatRouteSteps(instructions: any[]): string[] {
    return instructions.map(instruction => {
      const distance = this.formatDistance(instruction.distance);
      const duration = this.formatDuration(instruction.time);
      return `${instruction.text} (${distance}, ${duration})`;
    });
  }
  
  async onSubmit() {
    this.submitted = true;
    
    // Si el formulario es inválido, detener aquí
    if (this.contactForm.invalid) {
      this.markAllAsTouched();
      return;
    }
    
    this.formSuccess = false;
    this.formError = false;
    
    try {
      // Simulación de envío exitoso (en producción llamaría a un servicio real)
      setTimeout(() => {
        console.log('Formulario enviado:', this.contactForm.value);
        this.formSuccess = true;
        this.submitted = false;
        this.contactForm.reset();
        
        // Reset después de 5 segundos
        setTimeout(() => {
          this.formSuccess = false;
        }, 5000);
      }, 1500);
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
      this.formError = true;
    }
  }
  
  markAllAsTouched() {
    Object.values(this.contactForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  
  resetForm() {
    this.contactForm.reset();
    this.submitted = false;
    this.formSuccess = false;
    this.formError = false;
  }
  
  // Getters para acceso fácil a los form fields
  get f() { return this.contactForm.controls; }
  
  get nameControl() { return this.contactForm.get('name'); }
  get emailControl() { return this.contactForm.get('email'); }
  get phoneControl() { return this.contactForm.get('phone'); }
  get messageControl() { return this.contactForm.get('message'); }
}
