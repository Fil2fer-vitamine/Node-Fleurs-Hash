interface User {
  // id: number;    Il n'y a aucune raison de générer un id. Ceci a été implicité lors de la création de la table en mentionnant SERIAL
  nom: string;
  email: string;
  password: string;
}

export default User;
