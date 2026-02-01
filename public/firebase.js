// Importar Firebase SDK v10
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
    getFirestore, doc, setDoc, getDoc, onSnapshot 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// CONFIGURAÇÃO DO SEU PROJETO GERADO PELO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCSi4o6rxDpqvLPW987K1leGgdA5MMTQvU",
  authDomain: "torneio-sinuca-a4649.firebaseapp.com",
  projectId: "torneio-sinuca-a4649",
  storageBucket: "torneio-sinuca-a4649.firebasestorage.app",
  messagingSenderId: "610248134743",
  appId: "1:610248134743:web:d9f3b1167795ac9c645312"
};

// INICIALIZAÇÃO
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// 🔥 FUNÇÃO PARA SALVAR DADOS
export async function salvarDados(colecao, documento, dados) {
    try {
        await setDoc(doc(db, colecao, documento), dados, { merge: true });
        console.log("🔥 Dados salvos com sucesso!");
    } catch (erro) {
        console.error("Erro ao salvar:", erro);
    }
}


// 🔥 FUNÇÃO PARA LER DADOS UMA VEZ
export async function lerDados(colecao, documento) {
    try {
        const ref = doc(db, colecao, documento);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            return snap.data();
        }
    } catch (erro) {
        console.error("Erro ao ler:", erro);
    }
    return null;
}


// 🔥 FUNÇÃO PARA OUVIR EM TEMPO REAL (atualização ao vivo)
export function ouvirDados(colecao, documento, callback) {
    const ref = doc(db, colecao, documento);
    return onSnapshot(ref, (snap) => {
        if (snap.exists()) {
            callback(snap.data());
        }
    });
}
