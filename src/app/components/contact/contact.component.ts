import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isSubmitting = false;
  submitStatus = {
    success: false,
    message: ''
  };

  ngOnInit() {
    emailjs.init('YOUR_PUBLIC_KEY');
  }

  async onSubmit() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    this.submitStatus = { success: false, message: '' };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_name: this.formData.name,
          from_email: this.formData.email,
          subject: this.formData.subject,
          message: this.formData.message,
          to_email: 'yassaniq@gmail.com'
        }
      );

      this.submitStatus = {
        success: true,
        message: 'Votre message a été envoyé avec succès!'
      };
      this.formData = { name: '', email: '', subject: '', message: '' };
    } catch (error) {
      this.submitStatus = {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du message.'
      };
    } finally {
      this.isSubmitting = false;
    }
  }
}
