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
// Page chargée = lancement de la fonction typeWriter
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
// Fonction pour afficher un message dans la zone de chat
// Paramètre "sender" -> "bot" ou "user"
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

// Bouton "Explication" affiche modal listant mots-clés reconnus
document.getElementById("chat-help").addEventListener("click", () => {
  const keywordExplanation = `Mots-clés déclencheurs de réponses prédéfinies :
  - bonjour
  - qui es-tu
  - parcours
  - projets
  - ia
  - objectif`;

  // Désactivation scroll sur body
  document.body.style.overflow = "hidden";

  // Création fond semi-transparent (overlay)
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "1000";

  // Création modal
  const chatBox = document.createElement("div");
  chatBox.style.background = "white";
  chatBox.style.padding = "20px";
  chatBox.style.borderRadius = "10px";
  chatBox.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
  chatBox.style.width = "300px";
  chatBox.style.textAlign = "center";
  chatBox.innerHTML = `<p>${keywordExplanation.replace(/\n/g, "<br>")}</p>`;

  // Création bouton de fermeture
  const closeButton = document.createElement("button");
  closeButton.textContent = "Fermer";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "8px 15px";
  closeButton.style.border = "none";
  closeButton.style.background = "#007bff";
  closeButton.style.color = "white";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";

  // Fermeture modal au clic sur bouton
  closeButton.addEventListener("click", () => {
    overlay.remove();
    document.body.style.overflow = "auto"; // Réactivation du scroll
  });

  // Ajout bouton à la modal
  chatBox.appendChild(closeButton);

  // Ajout de la modal à l'overlay, puis ajout de l'overlay au body
  overlay.appendChild(chatBox);
  document.body.appendChild(overlay);
});
