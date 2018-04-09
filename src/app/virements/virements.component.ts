import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../Services/session/session.service';
import { Virement } from '../Classes/virement';
import { VirementService } from '../Services/api/virement/virement.service';

@Component({
  selector: 'bc-virements',
  templateUrl: './virements.component.html',
  styleUrls: ['./virements.component.css']
})
export class VirementsComponent implements OnInit {

  virements: Array<Virement> = [];

  constructor(private router: Router, private virementService: VirementService) { }

  ngOnInit() {
    if (!SessionService.isLoggedIn() || SessionService.isAdmin()) {
      this.router.navigate(['/login']);
    } else {
      this.virementService.getVirements()
        .subscribe(resp => {
          resp.map(element => {
            this.virements.push(new Virement(element.recipient_iban, element.montant, element.sender_id, element.date));
          });
        });
      console.log(this.virements);
    }

  }

  addVirement() {
    this.virements.push(new Virement('', 0, '', new Date(), false));
  }

  validVirement(virement: Virement) {
    virement.recipient_iban = virement.recipient_iban.replace(/\s/g,'');
    if (virement.isValid()) {
      this.virementService.addVirements(virement)
      .subscribe(resp => {
        console.log(resp);
        virement.done = true;
        });
    }
  }

  createVirement() {
  }
}
