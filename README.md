ProjetFinal Alyra : RealDiploma

Description 
Real Diploma est une plateforme innovante visant à offrir une authentification fiable et sécurisée des diplômes et des formations grâce à l'utilisation de la 
technologie blockchain. En permettant à chaque utilisateur de soumettre ses certifications à une validation par une justice décentralisée, Real Diploma garantit
une vérification transparente et impartiale. L'utilisation de la blockchain garantit l'immuabilité et l'inaltérabilité des données, offrant ainsi une protection
contre la fraude et la falsification des diplômes. De plus, la délivrance d'un jeton non fongible (NFT) en tant que preuve certifiée permet à l'utilisateur de 
disposer d'une attestation portable de ses diplômes

Adresse des contrats Sépolia 
RealDiplomaToken : 0x77aaAD3Aea730f733f06160a2e703e5ED3624ae7
![Verif-RealDiplomaToken](https://github.com/Spilitious/RealDiploma/assets/148981418/acb9299a-75fd-4dec-8730-67d25045677f)

DiplomaFile : 0x8c6f27F64FC25FE22558a195B37d11E9a4FB2Edf
![Verif-DiplomaFile](https://github.com/Spilitious/RealDiploma/assets/148981418/f8ae0a4f-21b6-4fd4-b39b-890ad5447bf4)


DiplomaNft : 0x77aaAD3Aea730f733f06160a2e703e5ED3624ae7
![Verif-RealDiplomaToken](https://github.com/Spilitious/RealDiploma/assets/148981418/bd167d70-e4f1-41e5-b8c8-2635a994f2be)

Déploiement Vercel 
https://real-diploma-frdk.vercel.app/

Vidéo de démonstration première partie 
- Dépôt d'un diplôme 
- Enregistrement du juré 
- Validation du diplôme non constesté 
- Mint du NFT associé au diplôme validé 
https://www.loom.com/share/eb61a079300c41238c95fdacacd19490?sid=6827bbb5-2f83-4ba1-9fca-c1b3095d74cd

Vidéo de démonstration deuxième partie
- Contestation d'un diplôme
- Vote sur le diplôme contesté
- Récupération des rewards pour les jurés ayant votés 
https://www.loom.com/share/3acb373863c5409da7f6eef4b505eaa5?sid=63c0a10e-23ff-4dcb-9dbc-02a882bebd95

Natspec 
backend/docs/index.md

Test unitaire
Vous trouverez les tests et leur coverage dans le fichier backend/tests/testU/rapport.md

Scripts
backend/scripts/0-total.js est script de déploiement local permettant de déployer le contrat et de passer une utilisation de toutes les fonctions du contrat.
La sortie console du scripts permet de suivre l'affectation des variables des contrats et des balances des utilisateurs au fur à mesure 
de leur interaction avec les contrats 


Stack utilisée pour la réalisation du front 
- NextJs
- RainbowKit
- Wagmi
- Viem
- ChakraUI

Le front n'est pas d'un esthétistisme à couper le souffle mais malgré les difficultés liées à des choix de conception backend peu compatible
avec l'affichage des différents éléments, il ne souffre d'aucun problème de rafraississement et protège l'utilisateur d'erreur de saisie ou de manipulation.   

Mes regrets 
Au dela de la difficulté à créer un front, l'architecture des contrats est à reprendre. Il aurait été plus judicieux de ne faire qu'une seule grande structure
avec tous les éléments dedans. Avec cette nouvelle architecture, il est possible de se passer entièrement des tableaux et de supprimer beaucoup de mapping. 

Améliorations à venir 
- Reprise du backend (01/05/2024)
- Création d'un dépôt de fichier sur IPFS pour la preuve de la contestation puis hashage du fichier enregistré dans le contrat (01/06/2024)
- Amélioration du système de vote avec principalement une fonction de validation d'un vote à partir d'un corum défini en fonction du nombre 
de token engagé dans le vote et la totalSupply de celui-ci (01/07/2024)
- Un swap RDA-ETH pour lequels les liquidity providers recevront des pouvoirs de vote (01/08/2024)

Stay tuned ! ;)

 
