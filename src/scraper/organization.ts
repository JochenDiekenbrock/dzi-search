export interface Organization {
  title: string;
  url: string;
  weltanschaulicheAusrichtung?: string;
  finanzen?: {
    bezugsjahr: number;
    gesamtEinnahmen: string;
    anteilKosten: string;
  };
}
