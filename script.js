// Effectue une requête HTTP GET vers l'API Strapi pour récupérer les articles
fetch('https://strapi-cms-vsqq.onrender.com/api/articles?populate=*')
    // Transforme la réponse en objet JavaScript (au format JSON)
    .then(response => response.json())

    // Une fois les données récupérées et transformées
    .then(data => {
        // Récupère l'élément HTML où les articles seront affichés
        const articlesContainer = document.getElementById('articles-container');

        // Vérifie que la réponse contient bien une liste d’articles
        if (data && data.data && Array.isArray(data.data)) {
            // Parcourt chaque article de la liste
            data.data.forEach(article => {
                console.log(article);
                // Accède aux données dans article.attributes (corrige ici si besoin)
                const titre = article.Titre || 'Titre indisponible'; // Titre de l'article
                const contenu = article.Contenu || 'Contenu indisponible'; // Texte principal
                const auteur = article.Auteur || 'Auteur inconnu'; // Nom de l’auteur
                const date = article.publishedAt || 'Aucune date de publication'; // Date
                const image = article.publishedAt || 'Aucune date de publication'; // Date

                // Récupération de la première image si disponible
                let imageUrl = '';
                if (Array.isArray(article.Image) && article.Image[0] && article.Image[0].url) {
                    imageUrl = 'http://localhost:1337' + article.Image[0].url;
                    console.log("image retrouver");
                }else {
                    console.log("Aucune image disponible");
                }

                // Crée un nouveau bloc HTML pour afficher l'article
                const articleElement = document.createElement('div');
                articleElement.innerHTML = `
                    <hr>
                     ${imageUrl ? `<img src="${imageUrl}" alt="${titre}" style="max-width:200px; height:auto;">` : ''}
                    <h2>${titre}</h2>
                    <p>${contenu}</p>
                    <p><strong>Auteur :</strong> ${auteur}</p>
                    <p><strong>Publié le :</strong> ${date.slice(0,10)}</p>
                `;

                // Ajoute le bloc article dans la page HTML
                articlesContainer.prepend(articleElement);
            });
        } else {
            // Affiche une erreur si la structure des données est invalide
            console.error("Pas de données valides reçues :", data);
        }
    })

    // Si une erreur survient (ex : connexion au serveur impossible)
    .catch(error => console.error('Erreur :', error));
