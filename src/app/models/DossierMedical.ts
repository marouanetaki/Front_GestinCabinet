import { Patient } from "./Patient";

export class DossierMedical {
    id: number;
    dateCreation: string;
    diagnostic: string;
    patient: Patient;
}