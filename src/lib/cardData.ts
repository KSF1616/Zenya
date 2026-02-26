export interface MindfulnessCard {
  id: string;
  category: string;
  title: string;
  description: string;
  practice: string;
  duration: string;
  image: string;
  color: string;
}

// Wheel 1 - ZENYA Wheel cards
export const zenyaCards: MindfulnessCard[] = [
  // Zen cards
  {
    id: 'zen-1',
    category: 'Zen',
    title: 'Breath of Stillness',
    description: 'Find your center through conscious breathing.',
    practice: 'Sit comfortably and close your eyes. Breathe in for 4 counts, hold for 4, exhale for 6. Repeat 10 times. Notice the space between breaths — that is where peace lives.',
    duration: '5 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078202659_d4efdbb3.jpg',
    color: '#86699D',
  },
  {
    id: 'zen-2',
    category: 'Zen',
    title: 'Walking Meditation',
    description: 'Transform your walk into a mindful practice.',
    practice: 'Walk slowly and deliberately for 10 minutes. Feel each foot connect with the earth. Notice the sensation of movement. Let thoughts pass like clouds.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078202659_d4efdbb3.jpg',
    color: '#86699D',
  },
  {
    id: 'zen-3',
    category: 'Zen',
    title: 'Body Scan Release',
    description: 'Release tension stored in your body.',
    practice: 'Lie down and slowly scan from your toes to the crown of your head. At each area, breathe into any tension and consciously release it on the exhale.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078202659_d4efdbb3.jpg',
    color: '#86699D',
  },
  // Energy cards
  {
    id: 'energy-1',
    category: 'Energy',
    title: 'Morning Sun Salutation',
    description: 'Awaken your body with flowing movement.',
    practice: 'Perform 5 rounds of Sun Salutation A. Move with your breath — inhale to expand, exhale to fold. Feel energy flowing through every cell.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078202191_e7f3e840.jpg',
    color: '#ACD9E0',
  },
  {
    id: 'energy-2',
    category: 'Energy',
    title: 'Power Breathwork',
    description: 'Ignite your inner fire with breath.',
    practice: 'Practice Kapalabhati breath: 30 quick, sharp exhales through the nose, then hold your breath for 30 seconds. Repeat 3 rounds. Feel the buzzing energy.',
    duration: '8 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078202191_e7f3e840.jpg',
    color: '#ACD9E0',
  },
  {
    id: 'energy-3',
    category: 'Energy',
    title: 'Dance Your Spirit Free',
    description: 'Move your body without judgment.',
    practice: 'Put on your favorite uplifting song. Close your eyes and let your body move however it wants. No choreography — just pure, joyful expression.',
    duration: '5 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078202191_e7f3e840.jpg',
    color: '#ACD9E0',
  },
  // Nutrition cards
  {
    id: 'nutrition-1',
    category: 'Nutrition',
    title: 'Mindful Eating Ritual',
    description: 'Transform your next meal into meditation.',
    practice: 'Before eating, pause and appreciate your food. Take 3 deep breaths. Eat slowly, chewing each bite 20 times. Notice flavors, textures, and how your body responds.',
    duration: '20 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078218060_1bf6675e.jpg',
    color: '#E9E4B5',
  },
  {
    id: 'nutrition-2',
    category: 'Nutrition',
    title: 'Hydration Intention',
    description: 'Infuse your water with positive energy.',
    practice: 'Fill a glass of water. Hold it in both hands and set an intention for nourishment. Drink slowly, imagining the water carrying healing energy to every cell.',
    duration: '3 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078218060_1bf6675e.jpg',
    color: '#E9E4B5',
  },
  {
    id: 'nutrition-3',
    category: 'Nutrition',
    title: 'Gratitude for Nourishment',
    description: 'Connect with the source of your food.',
    practice: 'Write down 5 things you are grateful for about the food you ate today. Consider the farmers, the sun, the rain, and the earth that made it possible.',
    duration: '5 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078218060_1bf6675e.jpg',
    color: '#E9E4B5',
  },
  // You First cards
  {
    id: 'youfirst-1',
    category: 'You First',
    title: 'Sacred Boundary Setting',
    description: 'Honor yourself by setting a boundary today.',
    practice: 'Identify one area where you need a boundary. Write it down. Practice saying "No, thank you" or "I need space for this." Remember: boundaries are an act of self-love.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078205258_4fb74898.jpg',
    color: '#86699D',
  },
  {
    id: 'youfirst-2',
    category: 'You First',
    title: 'Self-Love Letter',
    description: 'Write a love letter to yourself.',
    practice: 'Write a letter to yourself as if writing to your dearest friend. Acknowledge your struggles, celebrate your strengths, and remind yourself of your worth.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078205258_4fb74898.jpg',
    color: '#86699D',
  },
  {
    id: 'youfirst-3',
    category: 'You First',
    title: 'Digital Detox Hour',
    description: 'Reclaim an hour for yourself.',
    practice: 'Turn off all screens for one hour. Use this time for something that fills your cup — read, draw, garden, cook, or simply sit in silence.',
    duration: '60 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078205258_4fb74898.jpg',
    color: '#86699D',
  },
  // Affirmations cards
  {
    id: 'affirmation-1',
    category: 'Affirmations',
    title: 'Mirror Affirmation',
    description: 'Speak your truth to your reflection.',
    practice: 'Stand before a mirror. Look into your own eyes and repeat: "I am worthy. I am enough. I am becoming who I am meant to be." Say it until you feel it.',
    duration: '5 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078208945_f9fee764.jpg',
    color: '#ACD9E0',
  },
  {
    id: 'affirmation-2',
    category: 'Affirmations',
    title: 'Abundance Mantra',
    description: 'Open yourself to receiving.',
    practice: 'Close your eyes and repeat 21 times: "I am open to receiving all the abundance the universe has for me." Visualize golden light filling your heart.',
    duration: '7 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078208945_f9fee764.jpg',
    color: '#ACD9E0',
  },
  {
    id: 'affirmation-3',
    category: 'Affirmations',
    title: 'Gratitude Cascade',
    description: 'Let gratitude overflow from within.',
    practice: 'Write 10 things you are grateful for right now. For each one, close your eyes and truly feel the gratitude in your body. Let it wash over you like warm water.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078208945_f9fee764.jpg',
    color: '#ACD9E0',
  },
];

// Wheel 2 - SHAKEN Wheel cards
export const shakenCards: MindfulnessCard[] = [

  // Sexual Healing cards
  {
    id: 'sexual-1',
    category: 'Sexual Healing',
    title: 'Heart-Body Connection',
    description: 'Reconnect your heart and body.',
    practice: 'Place one hand on your heart and one on your lower belly. Breathe deeply and feel the connection between these two centers. Send love and acceptance to your body.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078238239_1d444245.jpg',
    color: '#5D3578',
  },
  {
    id: 'sexual-2',
    category: 'Sexual Healing',
    title: 'Sensory Awakening',
    description: 'Awaken your senses mindfully.',
    practice: 'Choose a piece of fruit. Explore it with all five senses — sight, touch, smell, sound, taste. Notice every subtle sensation. This practice awakens presence in the body.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078238239_1d444245.jpg',
    color: '#5D3578',
  },
  {
    id: 'sexual-3',
    category: 'Sexual Healing',
    title: 'Body Gratitude Practice',
    description: 'Thank your body for all it does.',
    practice: 'Touch each part of your body gently and thank it. "Thank you, hands, for creating. Thank you, legs, for carrying me." Honor your body as sacred.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078238239_1d444245.jpg',
    color: '#5D3578',
  },
  // Holistic Living cards
  {
    id: 'holistic-1',
    category: 'Holistic Living',
    title: 'Morning Ritual Design',
    description: 'Create a morning that nourishes all of you.',
    practice: 'Design a 30-minute morning ritual that includes movement, stillness, and nourishment. Write it down and commit to it for 7 days. Notice how it transforms your days.',
    duration: '30 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078242066_1374fe63.jpg',
    color: '#E4A2CB',
  },
  {
    id: 'holistic-2',
    category: 'Holistic Living',
    title: 'Chakra Check-In',
    description: 'Tune into your energy centers.',
    practice: 'Sit quietly and visualize each chakra from root to crown. Notice which feels blocked or overactive. Breathe colored light into each center to restore balance.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078242066_1374fe63.jpg',
    color: '#E4A2CB',
  },
  {
    id: 'holistic-3',
    category: 'Holistic Living',
    title: 'Wellness Wheel Assessment',
    description: 'Check in with all areas of your life.',
    practice: 'Rate yourself 1-10 in: Physical, Emotional, Mental, Spiritual, Social, Financial, Creative, Environmental health. Identify the lowest and set one small goal.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078242066_1374fe63.jpg',
    color: '#E4A2CB',
  },
  // Attitude cards
  {
    id: 'attitude-1',
    category: 'Attitude',
    title: 'Perspective Shift',
    description: 'See your challenge from a new angle.',
    practice: 'Think of a current challenge. Now imagine you are 80 years old looking back at this moment. What advice would your future self give? Write it down.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078243735_d7c9289d.jpg',
    color: '#1D736B',
  },
  {
    id: 'attitude-2',
    category: 'Attitude',
    title: 'Reframe the Negative',
    description: 'Transform a negative thought into growth.',
    practice: 'Write down a negative thought you have been carrying. Now rewrite it as a lesson or opportunity. "I failed" becomes "I learned what doesn\'t work and I\'m closer to what does."',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078243735_d7c9289d.jpg',
    color: '#1D736B',
  },
  {
    id: 'attitude-3',
    category: 'Attitude',
    title: 'Joy Inventory',
    description: 'Rediscover what brings you joy.',
    practice: 'List 20 things that bring you joy — big and small. Circle 3 you haven\'t done recently. Schedule one of them this week. Joy is not a luxury; it is medicine.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078243735_d7c9289d.jpg',
    color: '#1D736B',
  },
  // Kindness cards
  {
    id: 'kindness-1',
    category: 'Kindness',
    title: 'Random Act of Kindness',
    description: 'Spread light to someone today.',
    practice: 'Perform one unexpected act of kindness today: leave a kind note, pay for someone\'s coffee, send a heartfelt message, or simply smile at a stranger.',
    duration: '5 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078251199_208c83ee.jpg',
    color: '#5D3578',
  },
  {
    id: 'kindness-2',
    category: 'Kindness',
    title: 'Loving-Kindness Meditation',
    description: 'Send love to yourself and others.',
    practice: 'Sit quietly and repeat: "May I be happy. May I be healthy. May I be safe." Then extend to a loved one, a neutral person, a difficult person, and all beings.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078251199_208c83ee.jpg',
    color: '#5D3578',
  },
  {
    id: 'kindness-3',
    category: 'Kindness',
    title: 'Forgiveness Practice',
    description: 'Release the weight of resentment.',
    practice: 'Think of someone you need to forgive (including yourself). Write: "I release the pain of this experience. I choose peace over resentment. I am free."',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078251199_208c83ee.jpg',
    color: '#5D3578',
  },
  // Energy cards (Shaken)
  {
    id: 'shaken-energy-1',
    category: 'Energy',
    title: 'Grounding Visualization',
    description: 'Root your energy into the earth.',
    practice: 'Stand barefoot if possible. Visualize roots growing from your feet deep into the earth. Feel the earth\'s energy rising through you, stabilizing and grounding your being.',
    duration: '8 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078244413_d9f95a32.jpg',
    color: '#E4A2CB',
  },
  {
    id: 'shaken-energy-2',
    category: 'Energy',
    title: 'Shaking Medicine',

    description: 'Release stagnant energy through movement.',
    practice: 'Stand with feet hip-width apart. Begin shaking your whole body — hands, arms, legs, torso. Shake for 5 minutes, then stand still and feel the energy buzzing.',
    duration: '7 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078244413_d9f95a32.jpg',
    color: '#E4A2CB',
  },
  // Nature cards
  {
    id: 'nature-1',
    category: 'Nature',
    title: 'Earthing Practice',
    description: 'Connect directly with the earth.',
    practice: 'Go outside and place your bare feet on the ground — grass, soil, or sand. Stand for 10 minutes. Feel the earth\'s energy. Let nature reset your nervous system.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078244534_bff072fd.jpg',
    color: '#1D736B',
  },
  {
    id: 'nature-2',
    category: 'Nature',
    title: 'Cloud Watching',
    description: 'Practice presence by watching the sky.',
    practice: 'Lie on your back and watch the clouds for 15 minutes. Don\'t analyze — just observe. Notice shapes, movements, and the vastness of the sky. Let your mind expand.',
    duration: '15 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078244534_bff072fd.jpg',
    color: '#1D736B',
  },
  {
    id: 'nature-3',
    category: 'Nature',
    title: 'Tree Breathing',
    description: 'Breathe with a tree.',
    practice: 'Find a tree and sit with your back against it. Breathe in sync with the tree — imagine breathing in its oxygen and exhaling carbon dioxide for it. Feel the exchange of life.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078244534_bff072fd.jpg',
    color: '#1D736B',
  },
];

// All WILD cards (can come from any category)
export const wildCards: MindfulnessCard[] = [
  {
    id: 'wild-1',
    category: 'WILD',
    title: 'Surprise Meditation',
    description: 'A random act of mindfulness.',
    practice: 'Stop whatever you are doing right now. Take 10 deep breaths. Look around and name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
    duration: '5 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078206502_75d0ddd4.jpg',
    color: '#D4A574',
  },
  {
    id: 'wild-2',
    category: 'WILD',
    title: 'Creative Expression',
    description: 'Let your soul speak through art.',
    practice: 'Grab any art supplies — crayons, markers, paint. Set a timer for 10 minutes and create without thinking. No rules, no judgment. Let your subconscious guide your hand.',
    duration: '10 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078244748_e1dfe588.jpg',
    color: '#D4A574',
  },
  {
    id: 'wild-3',
    category: 'WILD',
    title: 'Laugh Therapy',
    description: 'Laughter is the best medicine.',
    practice: 'Start fake laughing for 30 seconds. It will feel silly, but soon real laughter will come. Laugh for 3 full minutes. Feel the joy and release in your body.',
    duration: '3 min',
    image: 'https://d64gsuwffb70l.cloudfront.net/699fc20eb683a7c99350ac73_1772078206502_75d0ddd4.jpg',
    color: '#D4A574',
  },
];

export function getRandomCard(category: string, wheel: 'zenya' | 'shaken'): MindfulnessCard {

  if (category === 'WILD') {
    return wildCards[Math.floor(Math.random() * wildCards.length)];
  }
  const cards = wheel === 'zenya' ? zenyaCards : shakenCards;
  const categoryCards = cards.filter(c => c.category === category);
  if (categoryCards.length === 0) {
    return wildCards[Math.floor(Math.random() * wildCards.length)];
  }
  return categoryCards[Math.floor(Math.random() * categoryCards.length)];
}
