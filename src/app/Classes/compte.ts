export class Compte{
    _id:string;
    owner_id:string;
    solde:number;
    creation_date:Date;
    iban:string;

    constructor(_id:string, owner_id:string, solde:number, creation_date:Date, iban:string){
        this._id = _id;
        this.owner_id = owner_id;
        this.solde = solde;
        this.creation_date = creation_date;
        this.iban = iban;
    }
}