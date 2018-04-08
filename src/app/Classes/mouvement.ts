export class Mouvement{
    compte_id:string;
    montant:number;
    date:Date;
    libelle:string

    constructor(compte_id:string, montant:number, date:Date, libelle:string){
        this.compte_id = compte_id;
        this.montant = montant;
        this.date = date;
        this.libelle = libelle;
    }
}