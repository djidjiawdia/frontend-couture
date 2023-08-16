export type Utilisateur = {
    id: number;
    email: string;
    username: string;
    role: Role;
};
export type Role = {
    id: number;
    libelle: string;
};
