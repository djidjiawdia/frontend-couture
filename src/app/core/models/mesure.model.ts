import { Client } from './client.model';

export type Mesure = {
    id: number;
    tete: number;
    cou: number;
    epaule: number;
    poitrine: number;
    hanches: number;
    cuisse: number;
    genou: number;
    mollet: number;
    cheville: number;
    biceps: number;
    coude: number;
    avantBras: number;
    entreJambe: number;
    mesureFemme?: {
        dessousPoit: number;
        crestesIliaque: number;
        ldos: number;
    };
    client: Client;
    lBras: number;
    lCorps: number;
    hTotal: number;
};
