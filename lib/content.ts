// All page copy lives here. Everything is placeholder content from the design —
// swap in real names, figures, venues and links.

export const site = {
  name: 'Iris Halden',
  role: 'Jumeaux numériques',
  email: 'iris@halden.dev',
  cvUrl: '#',
  socials: [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Scholar', href: '#' },
  ],
};

export const hero = {
  eyebrow: 'Ingénieure jumeaux numériques — Real-to-sim-to-real',
  lede: 'Je construis les jumeaux numériques de bras robotiques équipés de caméras : je capture la cellule réelle, je la reconstruis en simulation, j’y entraîne et valide les politiques, puis je les redéploie sur le robot — en mesurant l’écart à chaque aller-retour.',
  kpis: [
    { value: '< 1 mm', label: 'écart de pose sim-réel' },
    { value: '92 %', label: 'succès en transfert direct' },
    { value: '14', label: 'cellules jumelées en production' },
  ],
};

export const about = {
  paragraphs: [
    'Un robot qui marche en simulation n’a encore rien prouvé. Mon travail est de rendre la simulation assez fidèle pour qu’elle compte : caméras calibrées, dynamique identifiée, scènes reconstruites à partir de vraies captures — et un écart sim-réel mesuré, pas supposé.',
    'J’ai mis en place des jumeaux numériques pour des cellules de pick-and-place, d’assemblage et d’inspection, chez un intégrateur robotique puis dans une start-up de manipulation. Je relie le monde des moteurs physiques à celui des robots réels, de la reconstruction 3D jusqu’au déploiement embarqué.',
  ],
  facts: [
    { label: 'Domaine', value: 'Jumeaux numériques, sim-to-real' },
    { label: 'Actuellement', value: 'Lead Simulation — Robotix' },
    { label: 'Ouverte à', value: 'Postes Staff, conseil' },
  ],
};

export const projects = [
  {
    tag: 'Real-to-sim',
    title: 'Une cellule de pick-and-place jumelée',
    body: 'Bras collaboratif et caméra au poignet, reconstruits en simulation à partir d’un scan de la cellule. La politique de saisie est entraînée dans le jumeau, puis déployée telle quelle sur le robot.',
    stack: 'UR5e · RealSense D435 · Isaac Sim · ROS 2',
    stats: [
      { value: '94 %', label: 'succès réel' },
      { value: '0,8 mm', label: 'erreur de pose' },
      { value: '3 j', label: 'mise en service' },
    ],
    href: '#',
  },
  {
    tag: 'Calibration',
    title: 'Calibration main-œil dans le jumeau',
    body: 'La pose caméra-robot est estimée en confrontant des trajectoires réelles à leur rendu simulé, sans mire ni opérateur. Le jumeau se recale seul après chaque intervention.',
    stack: 'OpenCV · PyTorch3D · MoveIt 2',
    stats: [
      { value: '0,3°', label: 'en rotation' },
      { value: '0,6 mm', label: 'en translation' },
      { value: '4 min', label: 'par recalage' },
    ],
    href: '#',
  },
  {
    tag: 'Sim-to-real',
    title: 'Refermer l’écart sim-réel',
    body: 'Randomisation de domaine guidée par l’identification système des moteurs et de l’éclairage réel. Les politiques passent du simulateur au robot sans réglage manuel.',
    stack: 'MuJoCo · Isaac Lab · Jetson Orin',
    stats: [
      { value: '71 → 92 %', label: 'succès réel' },
      { value: '12 k', label: 'scènes générées' },
      { value: '0', label: 'réglage manuel' },
    ],
    href: '#',
  },
];

// The order matches the C1–C5 callouts on the 3D figure.
export const skills = [
  { code: 'C1', name: 'Perception', desc: 'Caméras RGB-D, calibration main-œil, Gaussian splatting, NeRF, estimation de pose 6D' },
  { code: 'C2', name: 'Simulation', desc: 'Isaac Sim, MuJoCo, Gazebo, OpenUSD, PhysX, rendu photoréaliste' },
  { code: 'C3', name: 'Contrôle', desc: 'ROS 2, MoveIt 2, ros2_control, cinématique inverse, planification de trajectoires' },
  { code: 'C4', name: 'Apprentissage', desc: 'RL, apprentissage par imitation, randomisation de domaine, identification système' },
  { code: 'C5', name: 'Embarqué', desc: 'Jetson Orin, TensorRT, C++ temps réel, EtherCAT, déploiement sur le robot' },
];

export const talks = [
  { year: '2026', title: 'Fermer la boucle : real-to-sim-to-real pour la manipulation', venue: 'Atelier ICRA — conférence', href: '#' },
  { year: '2025', title: 'Le Gaussian splatting comme jumeau numérique pour la saisie', venue: 'CoRL — article', href: '#' },
  { year: '2024', title: 'Calibrer sans mire : la calibration main-œil par le rendu', venue: 'ROSCon — conférence', href: '#' },
  { year: '2023', title: 'Identification système de bras collaboratifs pour le sim-to-real', venue: 'IEEE RA-L — article', href: '#' },
];

// Section names and figure captions, one per section, in page order.
export const sectionNames = ['Accueil', 'À propos', 'Projets', 'Compétences', 'Conférences', 'Contact'];
export const captions = [
  'Le réel et son jumeau, côte à côte.',
  'Real-to-sim : le jumeau se superpose au robot.',
  'Les deux bras saisissent ; l’écart se mesure.',
  'Chaque maillon de la chaîne, nommé.',
  'Vu d’ailleurs, pour les articles.',
  'Sim-to-real : de nouveau un seul robot.',
];
