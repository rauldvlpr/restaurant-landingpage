import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Resend } from 'resend';

@Component({
    selector: 'app-contact',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  submitError: string | null = null;
  
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
  
  async onSubmit() {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched(this.contactForm);
      return;
    }
    
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = null;
    
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
        this.submitError = 'Hubo un error al enviar tu mensaje. Por favor intenta más tarde.';
      } else {
        this.submitSuccess = true;
        this.contactForm.reset();
      }
    } catch (err) {
      console.error('Exception sending email:', err);
      this.submitError = 'Hubo un error al enviar tu mensaje. Por favor intenta más tarde.';
    } finally {
      this.isSubmitting = false;
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  
  get nameControl() { return this.contactForm.get('name'); }
  get emailControl() { return this.contactForm.get('email'); }
  get phoneControl() { return this.contactForm.get('phone'); }
  get messageControl() { return this.contactForm.get('message'); }
}
