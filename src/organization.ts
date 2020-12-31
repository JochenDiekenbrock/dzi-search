export interface Organization {
  title: string;
  url: string;
  volltext?: string;
  weltanschaulicheAusrichtung?: string;
  finanzen?: {
    bezugsjahr: number;
    gesamtEinnahmen: string;
    anteilKosten: string;
  };
}
