import { Medecin } from "./Medecin";
import { Patient } from "./Patient";

export class Rdv {
    id: number;
    dateRdv: string;
    heure: string;
    note: string;
    patient: Patient;
    medecin: Medecin;
}