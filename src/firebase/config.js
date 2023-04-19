import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCoUoW74QtiYA_OwLQAChfnSQ_JXaIAGP8',
  authDomain: 'miniblog-363bb.firebaseapp.com',
  projectId: 'miniblog-363bb',
  storageBucket: 'miniblog-363bb.appspot.com',
  messagingSenderId: '218833094001',
  appId: '1:218833094001:web:8d43d041a511ab9474a2d0',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
