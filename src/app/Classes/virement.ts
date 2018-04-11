export class Virement {
    recipient_iban: string;
    sender_id: string;
    montant: number;
    date: Date;
    done: boolean;

    constructor(recipient_iban: string, montant: number, sender_id?: string, date?: Date, done: boolean = true) {
        this.recipient_iban = recipient_iban;
        this.sender_id = sender_id;
        this.montant = montant;
        this.date = date;
        this.done = (done) ? done : false;
    }

    isValid(): boolean {
        if (!this.montant || !(this.montant > 0)) {
            alert('Veuillez entrer un montant supérieur à 0.');
            return false;
        }
        if (!this.recipient_iban || (this.recipient_iban.length !== 18)) {
            alert('IBAN invalide');
            return false;
        }
        return true;
    }

}
