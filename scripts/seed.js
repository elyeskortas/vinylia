// scripts/seed.js

import dotenv from 'dotenv';
dotenv.config();

import { connectToDB } from '../lib/mongodb.js'; // attention : ajoute .js si tu exécutes avec node
import Vinyl from '../models/vinyl.js';
import vinyls from '../data/vinyls.js';


async function seedDatabase() {
  try {
    await connectToDB();
    console.log('Connexion à MongoDB établie');

    // Supprimer les données existantes (optionnel mais conseillé pour éviter les doublons)
    await Vinyl.deleteMany({});
    console.log('Vinyles existants supprimés');

    // Insérer les nouveaux vinyles
    await Vinyl.insertMany(vinyls);
    console.log('Nouveaux vinyles insérés avec succès');

    process.exit(0); // sortir proprement
  } catch (err) {
    console.error('Erreur lors de l’insertion :', err);
    process.exit(1);
  }
}

seedDatabase();
