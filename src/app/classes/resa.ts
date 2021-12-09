import { Client } from './client';
import { Hotel } from './hotel';

export class Resa {
  id?: number;
  dateDeb?: Date;
  dateFin?: Date;
  numChambre?: number;
  hotel?: Hotel;
  client?: Client;
}
