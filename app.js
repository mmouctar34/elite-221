/* ═══════════════════════════════════════════════
   XAM SA BOP — Programme Élite 221
   app.js
   ═══════════════════════════════════════════════ */

/* ───────────────────────────────────────────────
   1. DONNÉES DU CURRICULUM
   ─────────────────────────────────────────────── */
const curriculum = [
  {
    id: 0,
    title: "Prise de Parole en Public",
    icon: "🎤",
    tags: ["Communication", "Voix & Corps", "Storytelling", "Gestion du stress"],
    lessons: [
      {
        title: "Techniques de Communication Efficace",
        badge: "Fondamentaux",
        html: `
          <div class="content-block">
            <h3>🗣️ Les Piliers de la Communication Impactante</h3>
            <p>La communication efficace repose sur bien plus que les mots que vous prononcez. Des recherches montrent que le message passe à <strong>55% par le langage corporel</strong>, <strong>38% par la voix</strong>, et seulement <strong>7% par les mots</strong> (modèle de Mehrabian).</p>
            <div class="insight-box">
              <div class="label">💡 Principe Clé</div>
              <p>Votre corps parle avant même que vous n'ouvriez la bouche. Un communicateur d'impact maîtrise les trois canaux simultanément : le verbe, la voix et le corps.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>🔑 Les 4 Éléments d'un Message Clair</h3>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">01</div><h4>Clarté</h4><p>Une idée principale par intervention. Évitez la surcharge d'informations.</p></div>
              <div class="technique-card"><div class="tnum">02</div><h4>Concision</h4><p>Dites en 2 minutes ce que d'autres disent en 10. La brièveté est une marque de respect.</p></div>
              <div class="technique-card"><div class="tnum">03</div><h4>Cohérence</h4><p>Alignez votre message, votre ton et vos gestes. Toute contradiction affaiblit votre impact.</p></div>
              <div class="technique-card"><div class="tnum">04</div><h4>Conviction</h4><p>Parlez avec passion de ce en quoi vous croyez. La conviction est contagieuse.</p></div>
            </div>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>La Méthode du Miroir</h4>
            <p>Entraînez-vous devant un miroir pendant 2 minutes. Présentez-vous en 60 secondes en vous concentrant sur votre posture, votre regard et le rythme de votre voix. Notez vos observations :</p>
            <textarea class="ex-textarea" placeholder="Ex : Mon regard fuit quand je parle de moi... Je dois travailler sur le contact visuel..."></textarea>
          </div>`
      },
      {
        title: "Gestion du Stress et du Trac",
        badge: "Maîtrise émotionnelle",
        html: `
          <div class="content-block">
            <h3>😤 Comprendre et Apprivoiser le Trac</h3>
            <p>Le trac n'est pas votre ennemi — c'est de l'énergie. Les grands orateurs ne cherchent pas à l'éliminer, ils apprennent à le convertir en puissance. Quand votre corps libère de l'adrénaline, votre cerveau s'affute, votre voix devient plus présente.</p>
            <div class="insight-box">
              <div class="label">🔬 Neuroscience</div>
              <p>L'anxiété de performance et l'excitation activent les mêmes circuits neurologiques. La différence ? L'interprétation. Dites <strong>"je suis excité"</strong> plutôt que "j'ai peur".</p>
            </div>
          </div>
          <div class="content-block">
            <h3>🧘 Les 5 Techniques Anti-Stress Prouvées</h3>
            <ul class="steps-list">
              <li><div class="step-num">1</div><div><strong>Respiration 4-7-8 :</strong> Inspirez 4 secondes, retenez 7, expirez 8. Répétez 3 fois. Active le système parasympathique.</div></li>
              <li><div class="step-num">2</div><div><strong>La Pose de Pouvoir :</strong> Tenez-vous droit, bras ouverts, pendant 2 minutes. Augmente la testostérone, réduit le cortisol (Amy Cuddy, Harvard).</div></li>
              <li><div class="step-num">3</div><div><strong>L'Ancrage Mental :</strong> Visualisez un souvenir fort de réussite passée. Ce "ancrage" active la confiance mémorielle.</div></li>
              <li><div class="step-num">4</div><div><strong>La Préparation Rituelle :</strong> Créez un rituel pré-intervention : même playlist, même exercice. Le cerveau associe ce rituel à la performance.</div></li>
              <li><div class="step-num">5</div><div><strong>Le Regard Bienveillant :</strong> Identifiez 3 visages bienveillants dans le public. Parlez à eux en alternance pour créer une zone de sécurité.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Mon Plan Anti-Stress Personnel</h4>
            <p>Choisissez vos 3 techniques préférées et décrivez comment vous les appliquerez concrètement :</p>
            <textarea class="ex-textarea" placeholder="Technique 1 : Je pratiquerai la respiration 4-7-8 dans les toilettes 10 min avant..."></textarea>
          </div>`
      },
      {
        title: "Structuration d'un Discours d'Impact",
        badge: "Storytelling",
        html: `
          <div class="content-block">
            <h3>📐 La Structure PEEL</h3>
            <p>Un discours sans structure est une maison sans fondations. La méthode PEEL est utilisée par les orateurs professionnels pour construire des interventions mémorables.</p>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">P</div><h4>Point</h4><p>Annoncez clairement votre idée principale dès le début.</p></div>
              <div class="technique-card"><div class="tnum">E</div><h4>Evidence</h4><p>Apportez une preuve : statistique, étude, fait vérifiable.</p></div>
              <div class="technique-card"><div class="tnum">E</div><h4>Example</h4><p>Racontez une histoire concrète. Le cerveau mémorise les histoires.</p></div>
              <div class="technique-card"><div class="tnum">L</div><h4>Link</h4><p>Reliez à votre message global. Synthèse et ouverture.</p></div>
            </div>
          </div>
          <div class="content-block">
            <h3>🎯 L'Accroche : Les 30 Premières Secondes</h3>
            <ul class="steps-list">
              <li><div class="step-num">1</div><div><strong>La Question Choc :</strong> "Combien d'entre vous ont déjà regretté de ne pas avoir parlé ?"</div></li>
              <li><div class="step-num">2</div><div><strong>La Statistique Surprenante :</strong> "75% des gens craignent plus de parler en public que de mourir."</div></li>
              <li><div class="step-num">3</div><div><strong>L'Histoire Personnelle :</strong> Commencez par un souvenir vivant et concret.</div></li>
              <li><div class="step-num">4</div><div><strong>La Citation Puissante :</strong> Une phrase qui résume parfaitement votre propos.</div></li>
              <li><div class="step-num">5</div><div><strong>Le Paradoxe :</strong> "Pour être compris, il faut d'abord accepter de se taire."</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Construisez votre Discours en 5 min</h4>
            <p>Sujet : "Pourquoi j'ai choisi de rejoindre le Programme Élite 221". Utilisez la structure PEEL :</p>
            <textarea class="ex-textarea" style="min-height:140px" placeholder="Point : Je rejoins cette formation parce que...&#10;Evidence : Des études montrent que...&#10;Example : Personnellement, j'ai vécu...&#10;Link : C'est pourquoi aujourd'hui..."></textarea>
          </div>`
      },
      {
        title: "Présence Scénique et Travail de la Voix",
        badge: "Performance",
        html: `
          <div class="content-block">
            <h3>🎭 Votre Corps est votre Instrument</h3>
            <p>La présence scénique, c'est cette qualité magnétique qui fait que les gens ne peuvent pas détacher leur regard de vous. Elle se construit — elle n'est pas innée.</p>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">👀</div><h4>Le Regard</h4><p>Contact visuel 3-5 secondes par personne. Balayage en "W" ou "Z" du public.</p></div>
              <div class="technique-card"><div class="tnum">🏛️</div><h4>La Posture</h4><p>Pieds ancrés à largeur d'épaules. Épaules ouvertes. Menton parallèle au sol.</p></div>
              <div class="technique-card"><div class="tnum">🤲</div><h4>Les Gestes</h4><p>Gestes ouverts au niveau de la ceinture. Chaque geste illustre — jamais ne distrait.</p></div>
              <div class="technique-card"><div class="tnum">🚶</div><h4>Le Déplacement</h4><p>Bougez avec intention. Avancez pour souligner. Reculez pour créer une pause réflexive.</p></div>
            </div>
          </div>
          <div class="content-block">
            <h3>🔊 Les 5 Paramètres Vocaux — VRIAP</h3>
            <ul class="steps-list">
              <li><div class="step-num">V</div><div><strong>Volume :</strong> Variez du murmure au ton affirmé. Le silence vaut mieux que le bruit.</div></li>
              <li><div class="step-num">R</div><div><strong>Rythme :</strong> Ralentissez sur l'essentiel. Accélérez dans les récits.</div></li>
              <li><div class="step-num">I</div><div><strong>Intonation :</strong> La voix monte sur les questions, descend sur les affirmations.</div></li>
              <li><div class="step-num">A</div><div><strong>Articulation :</strong> Ouvrez grand la bouche. Prononcez chaque syllabe.</div></li>
              <li><div class="step-num">P</div><div><strong>Pause :</strong> 3 secondes après une idée forte en doublent l'impact.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Quel aspect souhaitez-vous travailler en priorité ?</h4>
            <div class="ex-options">
              <div class="ex-option" onclick="toggleOption(this)">👀 Mon regard</div>
              <div class="ex-option" onclick="toggleOption(this)">🏛️ Ma posture</div>
              <div class="ex-option" onclick="toggleOption(this)">🤲 Mes gestes</div>
              <div class="ex-option" onclick="toggleOption(this)">🔊 Ma voix</div>
            </div>
            <textarea class="ex-textarea" placeholder="Décrivez 1 action concrète que vous allez faire cette semaine..."></textarea>
          </div>`
      }
    ]
  },

  {
    id: 1,
    title: "Leadership Moderne",
    icon: "👑",
    tags: ["Leadership agile", "Prise de décision", "Influence", "Relations"],
    lessons: [
      {
        title: "Fondamentaux du Leadership Agile",
        badge: "Théorie",
        html: `
          <div class="content-block">
            <h3>🚀 Le Leader du 21ème Siècle</h3>
            <p>Le leadership a fondamentalement changé. Fini le manager autoritaire. Le leader d'aujourd'hui est <strong>agile, humain et inspirant</strong> — il s'adapte, écoute et crée les conditions pour que les autres excellent.</p>
            <div class="insight-box">
              <div class="label">📊 Donnée Clé</div>
              <p>Selon Gallup, les employés qui ont un manager inspirant sont <strong>2,4x plus susceptibles</strong> d'être engagés dans leur travail.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>⚡ Les 4 Styles du Leadership Agile</h3>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">🎯</div><h4>Directif</h4><p>Donne des instructions claires. Efficace en crise ou avec des novices.</p></div>
              <div class="technique-card"><div class="tnum">🤝</div><h4>Coach</h4><p>Développe les compétences, pose des questions puissantes. Crée l'autonomie.</p></div>
              <div class="technique-card"><div class="tnum">💡</div><h4>Participatif</h4><p>Co-construit les décisions. Génère adhésion et créativité collective.</p></div>
              <div class="technique-card"><div class="tnum">🦅</div><h4>Visionnaire</h4><p>Inspire par une vision forte. Mobilise sur le sens et le "pourquoi".</p></div>
            </div>
            <p style="margin-top:16px">Le leader agile <strong>alterne entre ces styles</strong> selon la situation. La rigidité est l'ennemi du leadership efficace.</p>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Quel est votre style naturel ?</h4>
            <div class="ex-options">
              <div class="ex-option" onclick="toggleOption(this)">🎯 Directif</div>
              <div class="ex-option" onclick="toggleOption(this)">🤝 Coach</div>
              <div class="ex-option" onclick="toggleOption(this)">💡 Participatif</div>
              <div class="ex-option" onclick="toggleOption(this)">🦅 Visionnaire</div>
            </div>
            <textarea class="ex-textarea" placeholder="Donnez un exemple concret de situation où ce style s'est exprimé naturellement..."></textarea>
          </div>`
      },
      {
        title: "Leadership Personnel et Rayonnement",
        badge: "Identité",
        html: `
          <div class="content-block">
            <h3>✨ Se Commander Soi-Même d'Abord</h3>
            <p>On ne peut pas mener les autres là où on ne s'est pas soi-même rendu. Le leadership personnel précède le leadership d'équipe — il commence par la connaissance de soi, la maîtrise de ses réactions et la clarté de ses valeurs.</p>
            <div class="insight-box">
              <div class="label">🧭 Question Fondamentale</div>
              <p>Qui êtes-vous quand personne ne vous regarde ? C'est là que se forge le vrai caractère du leader. La réputation se construit en public, le caractère se forge dans le privé.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>🌟 Les 5 Dimensions du Rayonnement Personnel</h3>
            <ul class="steps-list">
              <li><div class="step-num">1</div><div><strong>Clarté de Vision :</strong> Savez-vous exactement où vous allez dans 3 ans ? La vision attire les ressources et les personnes alignées.</div></li>
              <li><div class="step-num">2</div><div><strong>Authenticité :</strong> Soyez la même personne en public et en privé. L'authenticité crée une confiance inébranlable.</div></li>
              <li><div class="step-num">3</div><div><strong>Générosité :</strong> Les leaders qui rayonnent donnent avant de demander. Apportez de la valeur sans attendre de retour.</div></li>
              <li><div class="step-num">4</div><div><strong>Constance :</strong> Le rayonnement se bâtit dans la durée. Soyez prévisiblement excellent.</div></li>
              <li><div class="step-num">5</div><div><strong>Énergie :</strong> Gérez votre énergie physique, mentale et émotionnelle. On ne peut donner que ce qu'on a.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Ma Déclaration de Leader</h4>
            <p>Rédigez en 3-5 phrases votre déclaration personnelle de leader — qui vous êtes, ce pour quoi vous vous battez, l'impact que vous voulez créer :</p>
            <textarea class="ex-textarea" style="min-height:120px" placeholder="Je suis [prénom], je crois profondément que...&#10;Ma mission est de...&#10;L'impact que je veux créer est..."></textarea>
          </div>`
      },
      {
        title: "Maîtrise de la Prise de Décision",
        badge: "Stratégie",
        html: `
          <div class="content-block">
            <h3>⚖️ Décider avec Clarté sous Pression</h3>
            <p>Un leader prend des centaines de décisions chaque semaine — la plupart sous pression, avec des informations incomplètes. Jeff Bezos distingue deux types :</p>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">T1</div><h4>Décisions Type 1</h4><p>Irréversibles, fort enjeu. Prenez le temps d'analyser avant d'agir.</p></div>
              <div class="technique-card"><div class="tnum">T2</div><h4>Décisions Type 2</h4><p>Réversibles, faible enjeu. Décidez vite. La vitesse est un avantage.</p></div>
            </div>
          </div>
          <div class="content-block">
            <h3>🧠 Le Cadre de Décision en 5 Étapes</h3>
            <ul class="steps-list">
              <li><div class="step-num">1</div><div><strong>Clarifier le vrai problème :</strong> Posez "pourquoi ?" 5 fois. Derrière le problème apparent se cache souvent le vrai.</div></li>
              <li><div class="step-num">2</div><div><strong>Collecter l'essentiel :</strong> 80% de l'information en 20% du temps. Évitez la paralysie par l'analyse.</div></li>
              <li><div class="step-num">3</div><div><strong>Générer 3 options :</strong> Ne cherchez pas LA bonne réponse — cherchez AU MOINS 3 options. La première est rarement la meilleure.</div></li>
              <li><div class="step-num">4</div><div><strong>Évaluer selon vos valeurs :</strong> Quelle option aligne le plus votre vision à long terme ?</div></li>
              <li><div class="step-num">5</div><div><strong>Décider et assumer :</strong> Une décision correctement exécutée à 80% vaut mieux qu'une décision parfaite jamais prise.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Application sur une Décision Réelle</h4>
            <p>Pensez à une décision que vous devez prendre actuellement. Appliquez le cadre en 5 étapes :</p>
            <textarea class="ex-textarea" style="min-height:140px" placeholder="La décision : ...&#10;Le vrai problème : ...&#10;Mes 3 options : ...&#10;L'option alignée à mes valeurs : ...&#10;Mon engagement : ..."></textarea>
          </div>`
      },
      {
        title: "Gestion des Relations Interpersonnelles",
        badge: "Intelligence relationnelle",
        html: `
          <div class="content-block">
            <h3>🤝 L'Intelligence Relationnelle</h3>
            <p>Votre réseau est votre valeur nette. Les leaders qui réussissent durablement construisent des alliances solides, gèrent les conflits avec maturité et créent des cercles de confiance.</p>
            <div class="insight-box">
              <div class="label">📈 Statistique</div>
              <p>Selon LinkedIn, <strong>85% des emplois sont pourvus via le réseau personnel</strong>. L'intelligence relationnelle est une compétence professionnelle stratégique.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>🎯 Les 4 Règles d'Or des Relations de Qualité</h3>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">👂</div><h4>Écoute Active</h4><p>Écoutez pour comprendre, pas pour répondre. Reformulez, posez des questions ouvertes.</p></div>
              <div class="technique-card"><div class="tnum">🎁</div><h4>Donnez d'Abord</h4><p>Apportez de la valeur sans attendre de retour. La générosité crée une dette positive.</p></div>
              <div class="technique-card"><div class="tnum">🔥</div><h4>Gérez les Conflits</h4><p>Attaquez le problème, pas la personne. Cherchez le "gagnant-gagnant".</p></div>
              <div class="technique-card"><div class="tnum">🌐</div><h4>Diversifiez</h4><p>Cultivez des relations au-delà de votre cercle habituel. La diversité = opportunités.</p></div>
            </div>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Ma Carte Relationnelle</h4>
            <p>Identifiez 3 personnes avec qui renforcer votre relation et notez 1 action concrète par personne :</p>
            <textarea class="ex-textarea" style="min-height:120px" placeholder="Personne 1 : [Prénom] — Action : Je vais...&#10;Personne 2 : [Prénom] — Action : Je vais...&#10;Personne 3 : [Prénom] — Action : Je vais..."></textarea>
          </div>`
      }
    ]
  },

  {
    id: 2,
    title: "Développement Personnel",
    icon: "🌱",
    tags: ["Intelligence émotionnelle", "Confiance en soi", "Discipline", "Objectifs"],
    lessons: [
      {
        title: "Intelligence Émotionnelle",
        badge: "Conscience de soi",
        html: `
          <div class="content-block">
            <h3>🧠 L'IE : Le QI du Siècle</h3>
            <p>Daniel Goleman a démontré que l'Intelligence Émotionnelle prédit le succès professionnel <strong>mieux que le QI dans 80% des cas</strong>. L'IE c'est la capacité à reconnaître, comprendre et gérer vos émotions, et à influencer positivement celles des autres.</p>
            <div class="insight-box">
              <div class="label">🔬 Recherche TalentSmart</div>
              <p>Les leaders avec une haute IE gagnent en moyenne <strong>29 000$ de plus par an</strong> que leurs homologues à faible IE. Les émotions ne sont pas un frein — elles sont un levier.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>💡 Développer votre IE en 4 Pratiques</h3>
            <ul class="steps-list">
              <li><div class="step-num">1</div><div><strong>Journal Émotionnel :</strong> Écrivez 3 minutes par jour sur ce que vous avez ressenti. Nommer une émotion la réduit de 50% (labeling effect).</div></li>
              <li><div class="step-num">2</div><div><strong>Pause entre Stimulus et Réponse :</strong> Comptez jusqu'à 5 avant de réagir. Dans cet espace réside votre liberté (Viktor Frankl).</div></li>
              <li><div class="step-num">3</div><div><strong>Pratique de l'Empathie :</strong> Avant chaque conversation importante, demandez-vous "Comment cette personne se sent-elle en ce moment ?"</div></li>
              <li><div class="step-num">4</div><div><strong>Feedback 360° :</strong> Demandez à 3 proches : "Comment je te parais quand je suis sous pression ?" La vérité des autres est un miroir précieux.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Audit Émotionnel de la Semaine</h4>
            <p>Décrivez une situation récente où vous avez mal géré une émotion. Que s'est-il passé ? Comment auriez-vous pu réagir différemment ?</p>
            <textarea class="ex-textarea" style="min-height:120px" placeholder="Situation : ...&#10;L'émotion ressentie : ...&#10;Ma réaction : ...&#10;Ce que j'aurais pu faire à la place : ..."></textarea>
          </div>`
      },
      {
        title: "Confiance en Soi et Estime Personnelle",
        badge: "Fondations",
        html: `
          <div class="content-block">
            <h3>🏛️ Construire des Fondations Solides</h3>
            <p>La confiance en soi n'est pas l'absence de doute — c'est la décision d'agir malgré le doute. L'estime de soi est le sentiment profond d'être digne d'amour et de réussite. Ces deux piliers se construisent pas à pas.</p>
            <div class="insight-box">
              <div class="label">🧠 Neuroscience</div>
              <p>Chaque fois que vous faites quelque chose que vous redoutiez, votre cerveau libère de la dopamine et recalibre son évaluation de la menace. La confiance se construit par l'<strong>accumulation de petits courages quotidiens</strong>.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>🔑 7 Stratégies pour Renforcer votre Confiance</h3>
            <ul class="steps-list">
              <li><div class="step-num">1</div><div><strong>Tenez vos promesses envers vous-même :</strong> Chaque engagement tenu renforce la confiance. Commencez petit.</div></li>
              <li><div class="step-num">2</div><div><strong>Célébrez vos victoires :</strong> Notez 3 réussites par jour, même minimes.</div></li>
              <li><div class="step-num">3</div><div><strong>Entourez-vous stratégiquement :</strong> Vos 5 proches déterminent votre niveau de confiance moyen.</div></li>
              <li><div class="step-num">4</div><div><strong>Agissez malgré la peur :</strong> L'action précède le courage, pas l'inverse.</div></li>
              <li><div class="step-num">5</div><div><strong>Parlez-vous bien :</strong> Remplacez "je suis nul en..." par "je suis en train d'apprendre à..."</div></li>
              <li><div class="step-num">6</div><div><strong>Soignez votre corps :</strong> L'exercice, le sommeil et l'alimentation impactent directement votre état mental.</div></li>
              <li><div class="step-num">7</div><div><strong>Apprenez en continu :</strong> La compétence nourrit la confiance. 30 min par jour dans votre apprentissage.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Lettre à Mon Futur Moi Confiant</h4>
            <p>Écrivez une lettre à vous-même dans 1 an. Décrivez qui vous serez, ce que vous aurez accompli, et comment vous vous sentirez :</p>
            <textarea class="ex-textarea" style="min-height:140px" placeholder="Cher [prénom] dans 1 an,&#10;&#10;Tu es maintenant quelqu'un qui...&#10;Tu as accompli...&#10;Tu te sens...&#10;Les gens autour de toi disent..."></textarea>
          </div>`
      },
      {
        title: "Discipline et Construction des Habitudes",
        badge: "Performance durable",
        html: `
          <div class="content-block">
            <h3>⚙️ La Discipline : Le Superpouvoir des Grands</h3>
            <p>Aristote : <em>"Nous sommes ce que nous faisons de manière répétée. L'excellence n'est donc pas un acte, mais une habitude."</em> James Clear démontre qu'une amélioration de <strong>1% par jour = 37x en un an</strong>.</p>
            <div class="insight-box">
              <div class="label">💡 La Règle des 2 Minutes</div>
              <p>Pour toute nouvelle habitude : commencez tellement petit que c'est impossible de ne pas le faire. 1 page, 1 pompe, 1 minute de méditation. La constance bat l'intensité.</p>
            </div>
          </div>
          <div class="content-block">
            <h3>🔄 Les 4 Lois du Changement (Atomic Habits)</h3>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">👁️</div><h4>Rendre Évident</h4><p>Créez des déclencheurs visuels. Posez votre livre sur la table de nuit.</p></div>
              <div class="technique-card"><div class="tnum">😍</div><h4>Rendre Attrayant</h4><p>Liez votre habitude à quelque chose que vous aimez (podcast + sport).</p></div>
              <div class="technique-card"><div class="tnum">✅</div><h4>Rendre Simple</h4><p>Réduisez la friction. La première version doit être ridiculement facile.</p></div>
              <div class="technique-card"><div class="tnum">🎉</div><h4>Rendre Satisfaisant</h4><p>Célébrez immédiatement. La dopamine du succès renforce le comportement.</p></div>
            </div>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Pratique</div>
            <h4>Mon Système d'Habitudes Élite 221</h4>
            <p>Définissez 3 habitudes quotidiennes — une par module :</p>
            <textarea class="ex-textarea" style="min-height:120px" placeholder="🎤 Prise de parole : Chaque matin 2 min, je parle à voix haute devant le miroir...&#10;&#10;👑 Leadership : Chaque soir, je note 1 décision bien prise...&#10;&#10;🌱 Dev perso : Chaque nuit, je lis 10 pages d'un livre de croissance..."></textarea>
          </div>`
      },
      {
        title: "Fixation d'Objectifs et Plan d'Action",
        badge: "Exécution",
        html: `
          <div class="content-block">
            <h3>🎯 Des Rêves aux Résultats</h3>
            <p>Un rêve sans plan est un vœu. Un plan sans action est une illusion. La méthode SMART transforme vos aspirations en résultats concrets et mesurables.</p>
          </div>
          <div class="content-block">
            <h3>📌 La Méthode SMART</h3>
            <div class="technique-grid">
              <div class="technique-card"><div class="tnum">S</div><h4>Spécifique</h4><p>"Améliorer ma prise de parole" → "Présenter 5 min sans note devant 10 personnes"</p></div>
              <div class="technique-card"><div class="tnum">M</div><h4>Mesurable</h4><p>Comment saurez-vous que vous avez réussi ? Définissez un indicateur précis.</p></div>
              <div class="technique-card"><div class="tnum">A</div><h4>Atteignable</h4><p>Ni trop facile (ennui), ni trop difficile (découragement). Juste challengeant.</p></div>
              <div class="technique-card"><div class="tnum">R/T</div><h4>Réaliste & Temporel</h4><p>Reliez à votre réalité. Fixez une date limite. Sans deadline, c'est un rêve.</p></div>
            </div>
          </div>
          <div class="content-block">
            <h3>🗺️ Votre Feuille de Route sur 90 Jours</h3>
            <ul class="steps-list">
              <li><div class="step-num">J30</div><div><strong>Premier mois :</strong> Complétez cette formation. Identifiez 1 mentor. Rejoignez la communauté Xam Sa Bop.</div></li>
              <li><div class="step-num">J60</div><div><strong>Deuxième mois :</strong> Prenez la parole lors de 3 occasions différentes. Lisez 2 livres de développement.</div></li>
              <li><div class="step-num">J90</div><div><strong>Troisième mois :</strong> Organisez un événement dans votre réseau. Partagez ce que vous avez appris.</div></li>
            </ul>
          </div>
          <div class="exercise-box">
            <div class="ex-label">Exercice Final</div>
            <h4>Mon Objectif Élite 221 — 90 Jours</h4>
            <p>Rédigez votre objectif SMART à 90 jours :</p>
            <textarea class="ex-textarea" style="min-height:140px" placeholder="Mon objectif spécifique : Dans 90 jours, je veux...&#10;&#10;Comment je mesurerai mon succès : ...&#10;&#10;Ce que je ferai cette semaine pour commencer : ...&#10;&#10;La date limite : __ / __ / 2026"></textarea>
          </div>`
      }
    ]
  }
];

/* ───────────────────────────────────────────────
   2. QUESTIONS DU QUIZ
   ─────────────────────────────────────────────── */
const quizQuestions = [
  {
    q: "Selon le modèle de Mehrabian, quel pourcentage de la communication passe par le langage corporel ?",
    opts: ["7%", "38%", "55%", "70%"],
    answer: 2,
    expl: "Le modèle de Mehrabian indique 55% langage corporel, 38% voix, 7% mots. D'où l'importance capitale de votre présence physique."
  },
  {
    q: "La technique de respiration anti-stress recommandée dans ce programme s'appelle :",
    opts: ["Respiration 5-5-5", "Respiration 4-7-8", "Respiration 3-6-9", "Respiration cohérente"],
    answer: 1,
    expl: "La respiration 4-7-8 : inspirez 4 sec, retenez 7, expirez 8. Elle active le système nerveux parasympathique, réduisant instantanément le stress."
  },
  {
    q: "Que signifie la lettre 'E' (première) dans la méthode PEEL ?",
    opts: ["Enthousiasme", "Evidence (preuve)", "Engagement", "Émotion"],
    answer: 1,
    expl: "PEEL = Point (idée), Evidence (preuve), Example (histoire), Link (lien). La preuve donne de la crédibilité à votre message."
  },
  {
    q: "Le leadership agile se caractérise principalement par :",
    opts: ["Rester toujours directif", "S'adapter selon la situation et la maturité de l'équipe", "Prendre toutes les décisions seul", "Éviter les conflits à tout prix"],
    answer: 1,
    expl: "Le leader agile alterne entre 4 styles (directif, coach, participatif, visionnaire) selon le contexte. La rigidité est l'ennemi du leadership efficace."
  },
  {
    q: "Jeff Bezos distingue deux types de décisions. Les 'Type 1' sont :",
    opts: ["Rapides et réversibles", "Irréversibles et à fort enjeu", "Déléguées à l'équipe", "Prises sans analyse"],
    answer: 1,
    expl: "Type 1 = irréversibles, fort enjeu → prenez le temps. Type 2 = réversibles, faible enjeu → décidez vite. Cette distinction transforme votre efficacité décisionnelle."
  },
  {
    q: "L'Intelligence Émotionnelle prédit le succès professionnel mieux que le QI dans :",
    opts: ["30% des cas", "50% des cas", "80% des cas", "95% des cas"],
    answer: 2,
    expl: "Selon Daniel Goleman, l'IE prédit le succès dans 80% des cas. C'est la compétence différenciatrice du 21ème siècle selon TalentSmart."
  },
  {
    q: "Selon James Clear (Atomic Habits), 1% d'amélioration par jour pendant 1 an produit une transformation de :",
    opts: ["10x", "37x", "100x", "365x"],
    answer: 1,
    expl: "1,01^365 ≈ 37,78. La constance des petites actions bat l'intensité ponctuelle sur le long terme. C'est le principe fondateur des Atomic Habits."
  },
  {
    q: "Dans la méthode SMART, que signifie le 'T' ?",
    opts: ["Traçable", "Transparent", "Temporel (avec deadline)", "Total"],
    answer: 2,
    expl: "SMART = Spécifique, Mesurable, Atteignable, Réaliste, Temporel. Sans date limite, un objectif reste un rêve. La deadline crée l'urgence d'agir."
  }
];

/* ───────────────────────────────────────────────
   3. ÉTAT DE L'APPLICATION
   ─────────────────────────────────────────────── */
const state = {
  currentModule:    0,
  currentLesson:    0,
  completedLessons: new Set(),
  quiz: {
    index:    0,
    score:    0,
    answered: false,
    done:     false
  }
};

/* ───────────────────────────────────────────────
   4. NAVIGATION ENTRE ÉCRANS
   ─────────────────────────────────────────────── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));

  document.getElementById('screen-' + id).classList.add('active');

  // Activer l'onglet correspondant
  document.querySelectorAll('.nav-tab').forEach(t => {
    if (t.dataset.screen === id) t.classList.add('active');
  });

  if (id === 'modules') renderModulesGrid();
  if (id === 'lesson')  renderLesson();
  if (id === 'quiz')    renderQuiz();

  updateProgressPill();
  window.scrollTo(0, 0);
}

/* ───────────────────────────────────────────────
   5. GRILLE DES MODULES
   ─────────────────────────────────────────────── */
function renderModulesGrid() {
  const grid = document.getElementById('modules-grid');
  grid.innerHTML = curriculum.map((mod, mi) => {
    const done = mod.lessons.filter((_, li) => state.completedLessons.has(`${mi}-${li}`)).length;
    const pct  = Math.round(done / mod.lessons.length * 100);
    const tags = mod.tags.map(t => `<span class="lesson-tag">${t}</span>`).join('');
    return `
      <div class="module-card" onclick="openModule(${mi})">
        <div class="module-num">MODULE 0${mi + 1}</div>
        <div class="module-icon">${mod.icon}</div>
        <div class="module-title">${mod.title}</div>
        <div class="module-desc">${getModuleDesc(mi)}</div>
        <div class="module-lessons">${tags}</div>
        <div class="module-footer">
          <div>
            <div class="module-progress">${done} / ${mod.lessons.length} leçons complétées</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
          </div>
          <button class="btn-sm">Accéder →</button>
        </div>
      </div>`;
  }).join('');
}

function getModuleDesc(mi) {
  const descs = [
    "Maîtrisez l'art de captiver un auditoire, gérer votre stress et structurer des discours percutants.",
    "Développez une posture de leader agile, prenez des décisions stratégiques et influencez positivement.",
    "Cultivez votre intelligence émotionnelle, renforcez votre confiance et construisez une discipline durable."
  ];
  return descs[mi];
}

function openModule(mi) {
  state.currentModule = mi;
  state.currentLesson = 0;
  showScreen('lesson');
}

/* ───────────────────────────────────────────────
   6. SIDEBAR
   ─────────────────────────────────────────────── */
function renderSidebar() {
  const sb = document.getElementById('sidebar-content');
  sb.innerHTML = curriculum.map((mod, mi) => `
    <div class="sidebar-module">
      <div class="sidebar-module-name">${mod.icon} ${mod.title}</div>
      ${mod.lessons.map((les, li) => {
        const key    = `${mi}-${li}`;
        const isDone = state.completedLessons.has(key);
        const isAct  = state.currentModule === mi && state.currentLesson === li;
        return `
          <div class="sidebar-lesson ${isDone ? 'done' : ''} ${isAct ? 'active' : ''}"
               onclick="goLesson(${mi}, ${li})">
            <div class="lesson-check">${isDone ? '✓' : ''}</div>
            <span>${les.title}</span>
          </div>`;
      }).join('')}
    </div>
  `).join('');
}

function goLesson(mi, li) {
  state.currentModule = mi;
  state.currentLesson = li;
  renderLesson();
  window.scrollTo(0, 0);
}

/* ───────────────────────────────────────────────
   7. RENDU DE LA LEÇON
   ─────────────────────────────────────────────── */
function renderLesson() {
  renderSidebar();

  const mod = curriculum[state.currentModule];
  const les = mod.lessons[state.currentLesson];
  const key = `${state.currentModule}-${state.currentLesson}`;

  // Calcul de l'index global pour prev/next
  let globalIndex = 0;
  for (let mi = 0; mi < state.currentModule; mi++) globalIndex += curriculum[mi].lessons.length;
  globalIndex += state.currentLesson;
  const totalLessons = curriculum.reduce((a, m) => a + m.lessons.length, 0);

  const hasPrev   = globalIndex > 0;
  const hasNext   = globalIndex < totalLessons - 1;
  const isDone    = state.completedLessons.has(key);

  const markBtn = isDone
    ? `<button class="btn-nav btn-done" disabled>✓ Terminé</button>`
    : `<button class="btn-nav btn-next" onclick="completeLesson()">✓ Marquer comme terminé</button>`;

  document.getElementById('lesson-content-area').innerHTML = `
    <div class="lesson-breadcrumb">
      ${mod.icon} ${mod.title} <span>/ ${les.title}</span>
    </div>
    <div class="lesson-title">${les.title}</div>
    <div class="lesson-meta">
      <span class="lesson-badge">${les.badge}</span>
      <span class="lesson-badge" style="background:rgba(255,255,255,.05);color:var(--gray)">
        Leçon ${state.currentLesson + 1} / ${mod.lessons.length}
      </span>
    </div>

    ${les.html}

    <div class="lesson-nav">
      ${hasPrev ? `<button class="btn-nav btn-prev" onclick="prevLesson()">← Précédent</button>` : ''}
      ${markBtn}
      ${hasNext ? `<button class="btn-nav btn-next btn-auto" onclick="nextLesson()">Suivant →</button>` : ''}
    </div>
  `;
}

function completeLesson() {
  state.completedLessons.add(`${state.currentModule}-${state.currentLesson}`);
  updateProgressPill();
  renderLesson();
}

function nextLesson() {
  const mod = curriculum[state.currentModule];
  if (state.currentLesson < mod.lessons.length - 1) {
    state.currentLesson++;
  } else if (state.currentModule < curriculum.length - 1) {
    state.currentModule++;
    state.currentLesson = 0;
  }
  renderLesson();
  window.scrollTo(0, 0);
}

function prevLesson() {
  if (state.currentLesson > 0) {
    state.currentLesson--;
  } else if (state.currentModule > 0) {
    state.currentModule--;
    state.currentLesson = curriculum[state.currentModule].lessons.length - 1;
  }
  renderLesson();
  window.scrollTo(0, 0);
}

/* ───────────────────────────────────────────────
   8. EXERCICES INTERACTIFS
   ─────────────────────────────────────────────── */
function toggleOption(el) {
  // Désélectionner les autres dans le même groupe
  const siblings = el.closest('.ex-options').querySelectorAll('.ex-option');
  siblings.forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

/* ───────────────────────────────────────────────
   9. QUIZ
   ─────────────────────────────────────────────── */
function renderQuiz() {
  const area = document.getElementById('quiz-area');
  if (state.quiz.done) { renderScore(); return; }

  const q   = quizQuestions[state.quiz.index];
  const pct = Math.round(state.quiz.index / quizQuestions.length * 100);

  area.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-num">Question ${state.quiz.index + 1} sur ${quizQuestions.length}</div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="quiz-q">${q.q}</div>
      <div class="quiz-hint">Choisissez la meilleure réponse</div>
    </div>

    <div class="quiz-options">
      ${q.opts.map((opt, i) => `
        <button class="quiz-option" id="qopt-${i}" onclick="answerQuiz(${i})">
          <div class="q-letter">${'ABCD'[i]}</div>
          ${opt}
        </button>
      `).join('')}
    </div>

    <div class="quiz-explanation" id="quiz-expl">${q.expl}</div>

    <div class="quiz-center">
      <button class="btn-primary" id="btn-next-q" style="display:none" onclick="nextQuestion()">
        ${state.quiz.index === quizQuestions.length - 1 ? 'Voir mes résultats →' : 'Question suivante →'}
      </button>
    </div>
  `;

  state.quiz.answered = false;
}

function answerQuiz(chosen) {
  if (state.quiz.answered) return;
  state.quiz.answered = true;

  const q = quizQuestions[state.quiz.index];
  document.querySelectorAll('.quiz-option').forEach((el, i) => {
    el.onclick = null;
    if (i === q.answer)                       el.classList.add('correct');
    else if (i === chosen && chosen !== q.answer) el.classList.add('wrong');
  });

  if (chosen === q.answer) state.quiz.score++;

  document.getElementById('quiz-expl').classList.add('show');
  document.getElementById('btn-next-q').style.display = 'inline-block';
}

function nextQuestion() {
  state.quiz.index++;
  if (state.quiz.index >= quizQuestions.length) {
    state.quiz.done = true;
    renderScore();
  } else {
    renderQuiz();
  }
}

function renderScore() {
  const total = quizQuestions.length;
  const score = state.quiz.score;
  const pct   = Math.round(score / total * 100);
  const msg   = pct >= 80
    ? "🏆 Excellent ! Vous maîtrisez les fondamentaux du Programme Élite 221."
    : pct >= 60
      ? "👍 Bien ! Relisez les sections sur lesquelles vous avez hésité."
      : "📚 Continuez à pratiquer — relisez les leçons et repassez le quiz.";

  document.getElementById('quiz-area').innerHTML = `
    <div class="score-card">
      <div class="score-ring">${pct}%</div>
      <div class="score-title">Quiz complété !</div>
      <div class="score-sub">${score} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''} sur ${total}</div>
      <p class="score-msg">${msg}</p>
      <div class="score-btns">
        <button class="btn-primary" onclick="restartQuiz()">Recommencer le Quiz</button>
        <button class="btn-outline" onclick="showScreen('modules')">Revoir les Modules</button>
      </div>
    </div>
  `;
}

function restartQuiz() {
  state.quiz.index    = 0;
  state.quiz.score    = 0;
  state.quiz.answered = false;
  state.quiz.done     = false;
  renderQuiz();
}

/* ───────────────────────────────────────────────
   10. PROGRESSION GLOBALE
   ─────────────────────────────────────────────── */
function updateProgressPill() {
  const total = curriculum.reduce((a, m) => a + m.lessons.length, 0);
  const done  = state.completedLessons.size;
  const pill  = document.getElementById('global-progress');
  if (pill) pill.textContent = `${done} / ${total} leçons`;
}

/* ───────────────────────────────────────────────
   11. ÉVÉNEMENTS
   ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Onglets de navigation
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => showScreen(tab.dataset.screen));
  });

  // Boutons CTA de l'accueil
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.goto));
  });

  // Init
  updateProgressPill();
});
