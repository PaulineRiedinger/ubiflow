// Effet "machine à écrire" pour afficher titre progressivement
// typewriterText contient texte à afficher caractère par caractère
const typewriterText = "Hello, je suis Pauline Riedinger";
const typewriterElement = document.getElementById("typewriter");
let index = 0;

function typeWriter() {
  // Boucle sur le texte dans la limite de sa longueur et ajout de chaque lettre dans élément HTML "typewriter"
  if (index < typewriterText.length) {
    typewriterElement.innerHTML += typewriterText.charAt(index);
    index++;
    // Rappel fonction après 100ms pour l'effet
    setTimeout(typeWriter, 100);
  }
}
// Page chargée = lancement de la fonction typeWriter.
window.addEventListener("load", typeWriter);

// Sélection des éléments du chatbot dans le DOM
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
// Dictionnaire de mots-clés + réponses prédéfinies
const responses = {
  bonjour:
    "Bonjour, ravie de vous rencontrer ! N'hésitez pas à cliquer sur Explication ou tapez aide pour en savoir plus.",

  parcours:
    "J'ai travaillé dans l'administratif pendant une dizaine d'années avant de me reconvertir dans le développement web via un bootcamp au Reacteur. J'y ai acquis des bases en HTML, CSS et JavaScript, ainsi que des notions en React, Node.js et MongoDB.",

  "qui es-tu":
    "Je suis Pauline, une développeuse curieuse qui aime apprendre, tester et découvrir. J'apprécie monter des sets Lego, jouer aux jeux vidéo et de société, lire, dessiner et créer. Ce qui me plaît dans le développement web, c'est la possibilité d'allier créativité et logique pour donner vie à une idée.",

  aide: "Ce chatbot peut vous présenter mon parcours, mes compétences et mes projets. Appuyez sur le bouton Explication pour en savoir plus.",

  projets:
    "J'ai réalisé plusieurs projets personnels visibles sur mon GitHub, dont un site web interactif inspiré de l'œuvre de Mondrian et un générateur aléatoire d'idées de projets web pour s'entraîner au code.",

  ia: "L'IA transforme le développement web. Je suis fascinée par son potentiel et j'aimerais explorer comment elle peut révolutionner nos méthodes de travail.",

  objectif:
    "Mon objectif est de continuer à apprendre en intégrant une équipe prête à m'accueillir et à m'aider à monter en compétences. Peut-être la vôtre ?",
};
// Fonction pour afficher un message dans la zone de chat.
// Paramètre "sender" -> "bot" ou "user".
function appendMessage(message, sender = "bot") {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender;
  messageDiv.textContent = message;
  chatLog.appendChild(messageDiv);

  // Défilement automatique en bas de la zone de log pour toujours voir dernier message
  chatLog.scrollTop = chatLog.scrollHeight;
}
// Clic sur bouton "Envoyer" -> récupération de la question de l'user, affichage, puis recherche réponse correspondante
chatSend.addEventListener("click", () => {
  const userMessage = chatInput.value.trim().toLowerCase();
  // Si champ vide -> on ne fait rien
  if (userMessage === "") return;
  // Affichage de la question côté user
  appendMessage("Moi: " + chatInput.value, "user");
  // Parcours des mots-clés pour trouver réponse correspondante
  let responseFound = false;
  for (let key in responses) {
    if (userMessage.includes(key)) {
      appendMessage("Bot: " + responses[key], "bot");
      responseFound = true;
      break;
    }
  }
  // Si aucun mot-clé -> demande de reformuler
  if (!responseFound) {
    appendMessage(
      "Bot: Désolée, il manque un mot-clé. Essayez de reformuler.",
      "bot"
    );
  }
  // Vidage champ de saisie pour nouvelle question
  chatInput.value = "";
});
// Permettre envoir question en appuyant sur "Entrée"
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    chatSend.click();
  }
});
// Bouton "Explication" affiche alerte listant mots-clés reconnus
document.getElementById("chat-help").addEventListener("click", () => {
  const keywordExplanation = `Mots-clés déclencheurs de réponses prédéfinies:
- bonjour
- qui es-tu
- parcours
- projets
- ia
- objectif`;

  alert(keywordExplanation);
});
