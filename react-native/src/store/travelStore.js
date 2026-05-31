/**
 * Wandr Store — AI travel planner state + demo data
 */
import { create } from 'zustand';

// Demo destinations with hotels, attractions, itineraries
export const DESTINATIONS = {
  tokyo: {
    id: 'tokyo', name: 'Tokyo', country: 'Japan', emoji: '🗼',
    tagline: 'Neon lights, ancient temples, world-class ramen',
    coords: { lat: 35.6762, lng: 139.6503 },
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    bestMonths: 'Mar–May, Oct–Nov',
    avgBudget: { budget: 80, mid: 180, luxury: 450 },
    hotels: [
      { id: 't1', name: 'Shinjuku Granbell Hotel', stars: 4, area: 'Shinjuku',
        price: 142, originalPrice: 189, rating: 8.9, reviews: 2341,
        lat: 35.6938, lng: 139.7034, amenities: ['WiFi','Gym','Restaurant'],
        bookUrl: 'https://www.booking.com', provider: 'Booking.com',
        tip: 'Walking distance to Golden Gai nightlife strip' },
      { id: 't2', name: 'Sotetsu Fresa Inn Asakusa', stars: 3, area: 'Asakusa',
        price: 89, originalPrice: 110, rating: 8.4, reviews: 1876,
        lat: 35.7147, lng: 139.7967, amenities: ['WiFi','Breakfast'],
        bookUrl: 'https://www.booking.com', provider: 'Booking.com',
        tip: '5 min walk to Senso-ji Temple, great budget pick' },
      { id: 't3', name: 'The Prince Park Tower', stars: 5, area: 'Minato',
        price: 380, originalPrice: 420, rating: 9.2, reviews: 987,
        lat: 35.6579, lng: 139.7453, amenities: ['WiFi','Pool','Spa','Gym'],
        bookUrl: 'https://www.expedia.com', provider: 'Expedia',
        tip: 'Tokyo Tower views from most rooms. Worth it for the experience' },
    ],
    attractions: [
      { id: 'ta1', name: 'Senso-ji Temple', lat: 35.7148, lng: 139.7967, type: 'culture', emoji: '⛩️', free: true },
      { id: 'ta2', name: 'Shibuya Crossing', lat: 35.6595, lng: 139.7004, type: 'landmark', emoji: '🚦', free: true },
      { id: 'ta3', name: 'Tsukiji Outer Market', lat: 35.6654, lng: 139.7707, type: 'food', emoji: '🍣', free: true },
      { id: 'ta4', name: 'teamLab Borderless', lat: 35.6255, lng: 139.7809, type: 'art', emoji: '🎨', free: false },
      { id: 'ta5', name: 'Shinjuku Gyoen', lat: 35.6852, lng: 139.7100, type: 'nature', emoji: '🌸', free: false },
    ],
    itinerary: [
      { day: 1, theme: 'Arrival & Shinjuku', items: ['Check in to hotel', 'Explore Shinjuku at night', 'Ramen on Memory Lane (Omoide Yokocho)', 'Golden Gai for drinks'] },
      { day: 2, theme: 'Ancient Tokyo', items: ['Senso-ji Temple at dawn (beat the crowds)', 'Nakamise Shopping Street', 'Tsukiji fish market lunch', 'teamLab Borderless digital art'] },
      { day: 3, theme: 'Modern Tokyo', items: ['Shibuya Crossing & Hachiko', 'Harajuku Takeshita St', 'Meiji Shrine', 'Rooftop bar in Roppongi'] },
      { day: 4, theme: 'Day Trip: Nikko', items: ['Shinkansen to Nikko', 'Tosho-gu Shrine complex', 'Kegon Falls', 'Return to Tokyo for yakitori dinner'] },
      { day: 5, theme: 'Food & Departure', items: ['Tsukiji breakfast sushi', 'Akihabara electronics & anime', 'Last minute shopping in Ginza', 'Airport transfer'] },
    ],
  },
  bali: {
    id: 'bali', name: 'Bali', country: 'Indonesia', emoji: '🌺',
    tagline: 'Temples, rice terraces, world-class surf',
    coords: { lat: -8.6100, lng: 115.2100 },
    bestMonths: 'Apr–Oct',
    avgBudget: { budget: 45, mid: 110, luxury: 280 },
    hotels: [
      { id: 'b1', name: 'COMO Uma Ubud', stars: 5, area: 'Ubud',
        price: 310, originalPrice: 380, rating: 9.4, reviews: 654,
        lat: -8.5069, lng: 115.2624, amenities: ['Pool','Spa','Yoga','Restaurant'],
        bookUrl: 'https://www.booking.com', provider: 'Booking.com',
        tip: 'Jungle views, incredible spa. Best in Ubud' },
      { id: 'b2', name: 'Kuta Seaview Boutique', stars: 3, area: 'Kuta',
        price: 58, originalPrice: 75, rating: 8.1, reviews: 3201,
        lat: -8.7215, lng: 115.1688, amenities: ['Pool','WiFi','Breakfast'],
        bookUrl: 'https://www.hotels.com', provider: 'Hotels.com',
        tip: 'Walk to Kuta Beach, good value, lively area' },
      { id: 'b3', name: 'Alaya Resort Ubud', stars: 4, area: 'Ubud',
        price: 185, originalPrice: 220, rating: 9.0, reviews: 1102,
        lat: -8.5089, lng: 115.2566, amenities: ['Pool','Spa','WiFi','Yoga'],
        bookUrl: 'https://www.expedia.com', provider: 'Expedia',
        tip: 'Private pool villas available. Central Ubud location' },
    ],
    attractions: [
      { id: 'ba1', name: 'Tegallalang Rice Terraces', lat: -8.4322, lng: 115.2795, type: 'nature', emoji: '🌾', free: false },
      { id: 'ba2', name: 'Tanah Lot Temple', lat: -8.6215, lng: 115.0865, type: 'culture', emoji: '⛩️', free: false },
      { id: 'ba3', name: 'Ubud Monkey Forest', lat: -8.5190, lng: 115.2588, type: 'nature', emoji: '🐒', free: false },
      { id: 'ba4', name: 'Seminyak Beach', lat: -8.6919, lng: 115.1569, type: 'beach', emoji: '🏄', free: true },
      { id: 'ba5', name: 'Uluwatu Temple', lat: -8.8291, lng: 115.0849, type: 'culture', emoji: '🌅', free: false },
    ],
    itinerary: [
      { day: 1, theme: 'Arrival & Seminyak', items: ['Check in', 'Seminyak Beach sunset', 'Dinner at Potato Head Beach Club', 'Explore Seminyak strip'] },
      { day: 2, theme: 'Cultural Ubud', items: ['Rice terraces at Tegallalang', 'Ubud Monkey Forest', 'Ubud Art Market', 'Traditional Kecak dance at sunset'] },
      { day: 3, theme: 'Temple Trail', items: ['Tanah Lot at sunrise', 'Besakih Mother Temple', 'Uluwatu at sunset', 'Seafood at Jimbaran Bay'] },
      { day: 4, theme: 'Surf & Chill', items: ['Surf lesson at Kuta Beach', 'Pool day', 'Seminyak sunset cocktails', 'Farewell dinner'] },
    ],
  },
  paris: {
    id: 'paris', name: 'Paris', country: 'France', emoji: '🗼',
    tagline: 'Art, cuisine, romance, and the Eiffel Tower',
    coords: { lat: 48.8566, lng: 2.3522 },
    bestMonths: 'Apr–Jun, Sep–Oct',
    avgBudget: { budget: 120, mid: 250, luxury: 600 },
    hotels: [
      { id: 'p1', name: 'Hotel du Louvre', stars: 4, area: 'Louvre',
        price: 285, originalPrice: 340, rating: 8.8, reviews: 4521,
        lat: 48.8631, lng: 2.3362, amenities: ['WiFi','Restaurant','Bar','Gym'],
        bookUrl: 'https://www.booking.com', provider: 'Booking.com',
        tip: 'Directly opposite the Louvre. Unbeatable location' },
      { id: 'p2', name: 'Hotel Bastille Speria', stars: 3, area: 'Bastille',
        price: 138, originalPrice: 165, rating: 8.2, reviews: 2876,
        lat: 48.8533, lng: 2.3692, amenities: ['WiFi','Breakfast'],
        bookUrl: 'https://www.hotels.com', provider: 'Hotels.com',
        tip: 'Great local feel, easy metro access, less touristy area' },
      { id: 'p3', name: 'Le Bristol Paris', stars: 5, area: 'Champs-Élysées',
        price: 890, originalPrice: 1050, rating: 9.5, reviews: 1243,
        lat: 48.8732, lng: 2.3124, amenities: ['Pool','Spa','Michelin Restaurant','Concierge'],
        bookUrl: 'https://www.expedia.com', provider: 'Expedia',
        tip: 'The pinnacle of Parisian luxury. Once in a lifetime' },
    ],
    attractions: [
      { id: 'pa1', name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, type: 'landmark', emoji: '🗼', free: false },
      { id: 'pa2', name: 'The Louvre', lat: 48.8606, lng: 2.3376, type: 'museum', emoji: '🎨', free: false },
      { id: 'pa3', name: 'Notre Dame Cathedral', lat: 48.8530, lng: 2.3499, type: 'culture', emoji: '⛪', free: true },
      { id: 'pa4', name: 'Montmartre & Sacré-Cœur', lat: 48.8867, lng: 2.3431, type: 'culture', emoji: '⛪', free: true },
      { id: 'pa5', name: 'Palace of Versailles', lat: 48.8049, lng: 2.1204, type: 'landmark', emoji: '👑', free: false },
    ],
    itinerary: [
      { day: 1, theme: 'Arrival & Icons', items: ['Check in', 'Eiffel Tower (book timed entry)', 'Seine River cruise', 'Dinner in Le Marais'] },
      { day: 2, theme: 'Art & Culture', items: ['Louvre (arrive early)', 'Lunch at Café Marly', 'Notre Dame exterior', 'Pompidou Centre', 'Apéro at a brasserie'] },
      { day: 3, theme: 'Montmartre & Markets', items: ['Sacré-Cœur at dawn', 'Artists in Place du Tertre', 'Moulin Rouge neighbourhood', 'Galeries Lafayette food hall'] },
      { day: 4, theme: 'Day Trip: Versailles', items: ['Early train to Versailles', 'Palace & Hall of Mirrors', 'Gardens', 'Back to Paris for farewell dinner'] },
    ],
  },
};

// Pre-baked AI responses for demo destinations
const AI_RESPONSES = {
  tokyo: {
    summary: "Tokyo is an incredible choice! I've found you the perfect 5-day itinerary mixing ancient temples with neon-lit modernity. Best time to visit is spring (cherry blossoms) or autumn. Budget: ~$150/day mid-range including accommodation.",
    highlight: "Pro tip from your AI planner: book teamLab Borderless online — it sells out weeks ahead. And try ramen at 2am in Shinjuku — that's when the real locals eat 🍜",
  },
  bali: {
    summary: "Bali is perfect for your vibe! I've planned a mix of culture in Ubud and beach time in Seminyak. Best visited April-October (dry season). Budget: ~$90/day mid-range. Go at least 7 nights — you'll want to stay longer.",
    highlight: "Pro tip: Rent a scooter for Ubud day trips — it's how locals get around and costs $5/day. Avoid peak crowds at rice terraces by going before 8am 🌅",
  },
  paris: {
    summary: "Paris is always a good idea! I've built you 4 days covering the classics without the tourist traps. Go in April-June for perfect weather. Budget: ~$200/day mid-range. Book Eiffel Tower tickets 2 months in advance!",
    highlight: "Pro tip: Skip Champs-Élysées restaurants (tourist traps) — walk one block in any direction for authentic bistros at half the price. The free museums on first Sundays are incredible 🥐",
  },
};

export const useTravelStore = create((set, get) => ({
  phase: 'home',   // home | search | destination | map | itinerary
  query: '',
  selectedDest: null,
  selectedHotel: null,
  activeTab: 'hotels',  // hotels | attractions | itinerary
  aiTyping: false,
  aiMessage: '',
  aiHighlight: '',
  budget: 'mid',   // budget | mid | luxury

  setQuery: (q) => set({ query: q }),
  setBudget: (b) => set({ budget: b }),
  setActiveTab: (t) => set({ activeTab: t }),

  searchDestination: async (query) => {
    set({ aiTyping: true, phase: 'search' });
    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1800));

    // Match query to demo destination
    const q = query.toLowerCase();
    let destId = 'tokyo';
    if (q.includes('bali') || q.includes('indonesia') || q.includes('surf') || q.includes('temple')) destId = 'bali';
    else if (q.includes('paris') || q.includes('france') || q.includes('europe') || q.includes('romance')) destId = 'paris';
    else if (q.includes('japan') || q.includes('tokyo') || q.includes('ramen') || q.includes('anime')) destId = 'tokyo';

    const dest = DESTINATIONS[destId];
    const ai = AI_RESPONSES[destId];

    set({
      selectedDest: dest,
      aiMessage: ai.summary,
      aiHighlight: ai.highlight,
      aiTyping: false,
      phase: 'destination',
      selectedHotel: null,
    });
  },

  selectDest: (destId) => {
    const dest = DESTINATIONS[destId];
    const ai = AI_RESPONSES[destId];
    set({ selectedDest: dest, aiMessage: ai.summary, aiHighlight: ai.highlight, phase: 'destination' });
  },

  selectHotel: (hotel) => set({ selectedHotel: hotel }),
  clearHotel: () => set({ selectedHotel: null }),
  setPhase: (p) => set({ phase: p }),

  getFilteredHotels: () => {
    const { selectedDest, budget } = get();
    if (!selectedDest) return [];
    return selectedDest.hotels.filter(h => {
      if (budget === 'budget') return h.price < 100;
      if (budget === 'luxury') return h.price >= 300;
      return h.price >= 100 && h.price < 300;
    }).sort((a, b) => b.rating - a.rating);
  },
}));
