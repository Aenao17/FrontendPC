import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  events = [
    {
      title: 'Hackathon 2024',
      date: '20 Noiembrie 2024',
      description: 'Concurs de programare destinat studenților și pasionaților de tehnologie. Formează o echipă și rezolvă provocări în 24 de ore!',
      image: 'assets/images/images.png'
    },
    {
      title: 'Workshop: Inteligența Artificială în 2024',
      date: '25 Noiembrie 2024',
      description: 'Învață bazele inteligenței artificiale și cum să construiești un model simplu de învățare automată. Organizator: Universitatea de Informatică.',
      image: 'assets/images/ai-workshop.jpg'
    },
    {
      title: 'Seara Proiectelor Studențești',
      date: '30 Noiembrie 2024',
      description: 'Prezentarea celor mai inovative proiecte realizate de studenții din anul 3. Intrare liberă pentru toți studenții.',
      image: 'assets/images/student-projects.jpg'
    },
    {
      title: 'Conferință: Viitorul Tehnologiei Cloud',
      date: '5 Decembrie 2024',
      description: 'Participă la discuții despre impactul și viitorul tehnologiei Cloud. Speakeri invitați din industria IT.',
      image: 'assets/images/cloud-conference.jpg'
    },
    {
      title: 'Eveniment de Networking IT',
      date: '10 Decembrie 2024',
      description: 'Ocazia perfectă să întâlnești profesioniști din domeniul IT și să-ți extinzi rețeaua profesională. Organizator: Clubul de Informatică.',
      image: 'assets/images/networking-event.jpg'
    },
    {
      title: 'Competiție de Algoritmică',
      date: '15 Decembrie 2024',
      description: 'Testează-ți abilitățile de algoritmică și rezolvarea de probleme. Premiile includ burse și stagii de practică.',
      image: 'assets/images/algorithm-competition.jpg'
    }
  ];

  constructor() {}

  joinEvent(event: any) {
    console.log('Te-ai înscris la evenimentul: ${event.title}');
  }

  viewEvent(event: any) {
    console.log('Vizualizezi detalii pentru: ${event.title}');
  }

  logout() {
    console.log('Te-ai deconectat.');
    // Poți adăuga logica de logout aici.
  }
}
