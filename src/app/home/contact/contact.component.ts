import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resend } from 'resend';

declare var google: any;

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
  selectedMode: string = 'DRIVING';
  isLoadingMap: boolean = true;
  routeInfo: any = null;
  
  transportModes = [
    { label: 'Auto', value: 'DRIVING', icon: 'icon-car' },
    { label: 'Caminando', value: 'WALKING', icon: 'icon-walk' },
    { label: 'Bicicleta', value: 'BICYCLING', icon: 'icon-bike' },
    { label: 'Transporte', value: 'TRANSIT', icon: 'icon-bus' }
  ];
  
  private map: any;
  private directionsService: any;
  private directionsRenderer: any;
  private geocoder: any;
  private restaurantLocation = { lat: 18.796768687267705, lng: -99.10292387479878 };
  
  // Esta API key debería estar en un environment file y nunca directamente en el código
  // Para producción, deberías implementar un backend para manejar esto de forma segura
  private resend = new Resend('re_123');
  
  constructor(private fb: FormBuilder) {
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
  
  ngOnInit() {
    // Cargar la API de Google Maps después de que el componente se inicialice
    this.loadGoogleMapsScript();
  }
  
  private loadGoogleMapsScript() {
    // Solo cargar si no está ya cargado
    if (!window.document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => this.initMap();
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  }
  
  private initMap() {
    // Inicializa el mapa, los servicios de direcciones y el geocodificador
    this.map = new google.maps.Map(document.getElementById('mapDirections'), {
      center: this.restaurantLocation,
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false
    });
    
    // Añade un marcador para el restaurante
    new google.maps.Marker({
      position: this.restaurantLocation,
      map: this.map,
      title: 'El Jaripeo Campestre',
      icon: {
        url: 'assets/images/marker-restaurant.png',
        scaledSize: new google.maps.Size(40, 40)
      }
    });
    
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#e62e2e',
        strokeWeight: 5
      }
    });
    
    this.geocoder = new google.maps.Geocoder();
    this.isLoadingMap = false;
  }
  
  detectUserLocation() {
    if (navigator.geolocation) {
      this.isLoadingMap = true;
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Convertir coordenadas a dirección legible
          this.geocodeLatLng(pos);
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
  
  private geocodeLatLng(location: any) {
    this.geocoder.geocode({ 'location': location }, (results: any, status: any) => {
      this.isLoadingMap = false;
      
      if (status === 'OK' && results[0]) {
        this.originAddress = results[0].formatted_address;
        this.map.setCenter(location);
      } else {
        alert('No se pudo convertir tus coordenadas a una dirección legible.');
      }
    });
  }
  
  setTransportMode(mode: string) {
    this.selectedMode = mode;
  }
  
  calculateRoute() {
    if (!this.originAddress) {
      alert('Por favor ingresa tu ubicación de origen.');
      return;
    }
    
    this.isLoadingMap = true;
    this.routeInfo = null;
    
    const request = {
      origin: this.originAddress,
      destination: this.restaurantAddress,
      travelMode: this.selectedMode
    };
    
    this.directionsService.route(request, (result: any, status: any) => {
      this.isLoadingMap = false;
      
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
        this.processRouteInfo(result);
      } else {
        alert('No se pudo calcular la ruta: ' + status);
      }
    });
  }
  
  private processRouteInfo(result: any) {
    const route = result.routes[0];
    const leg = route.legs[0];
    
    this.routeInfo = {
      distance: leg.distance.text,
      duration: leg.duration.text,
      steps: leg.steps.map((step: any) => step.instructions)
    };
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
      // En realidad, esta parte debería hacerse en un backend por seguridad
      // Implementación frontal solo para demostración
      const { name, email, phone, message } = this.contactForm.value;
      
      const { data, error } = await this.resend.emails.send({
        from: 'onboarding@resend.dev', // Usar un dominio verificado en producción
        to: 'info@jaripeo-campestre.com', // Email del restaurante
        subject: `Nuevo mensaje de contacto de ${name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${message}</p>
        `,
      });
      
      if (error) {
        console.error('Error sending email:', error);
        this.formError = true;
      } else {
        this.formSuccess = true;
        this.submitted = false;
        this.contactForm.reset();
      }
    } catch (err) {
      console.error('Exception sending email:', err);
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
