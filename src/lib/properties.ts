export interface Property {
  id: number
  title: string
  location: string
  city: string
  priceInCrores: number
  bedrooms: number
  bathrooms: number
  sqft: number
  image: string
  description: string
  features: string[]
  galleryImages: string[]
  position?: { x: string; y: string }
}

export const properties: Property[] = [
  {
    id: 1,
    title: 'Lutyens Bungalow',
    location: 'Golf Links, New Delhi',
    city: 'New Delhi',
    priceInCrores: 125,
    bedrooms: 6,
    bathrooms: 8,
    sqft: 12000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
    description: 'An architectural masterpiece in the heart of Lutyens Delhi, this bungalow exemplifies colonial grandeur reimagined for modern luxury living. Situated on a sprawling plot with mature gardens, the residence offers complete privacy while being minutes from Delhi\'s diplomatic enclave.',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    features: ['Private elevator access', 'Heritage architecture with modern amenities', 'Temperature-controlled wine cellar', 'Home theater', 'Indoor swimming pool', 'Staff quarters with separate entrance', 'Smart home automation', '4-car garage'],
    position: { x: '25%', y: '35%' },
  },
  {
    id: 2,
    title: 'Sea-Facing Residence',
    location: 'Malabar Hill, Mumbai',
    city: 'Mumbai',
    priceInCrores: 185,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8500,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    description: 'Perched atop Mumbai\'s most prestigious address, this residence commands unobstructed views of the Arabian Sea and the Queen\'s Necklace. Floor-to-ceiling windows flood every room with natural light, while bespoke finishes create an atmosphere of refined elegance.',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753355-35792bedcfea?w=1200&q=80',
    ],
    features: ['Panoramic sea views', '24/7 concierge service', 'Infinity edge pool', 'Private gym and spa', 'Italian marble throughout', 'Chef\'s kitchen with Sub-Zero appliances', 'Smart climate control', 'Direct elevator access'],
    position: { x: '70%', y: '30%' },
  },
  {
    id: 3,
    title: 'Garden Estate',
    location: 'Sadashivanagar, Bangalore',
    city: 'Bangalore',
    priceInCrores: 75,
    bedrooms: 7,
    bathrooms: 7,
    sqft: 15000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    description: 'Nestled in Bangalore\'s greenest neighborhood, this estate seamlessly blends indoor and outdoor living. Expansive gardens designed by award-winning landscapers create a private oasis, while contemporary interiors offer every modern comfort.',
    galleryImages: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    ],
    features: ['1-acre landscaped gardens', 'Outdoor entertainment pavilion', 'Koi pond and water features', 'Home office suite', 'Guest wing with 2 bedrooms', 'Gourmet kitchen', 'Solar power system', 'Rainwater harvesting'],
    position: { x: '50%', y: '65%' },
  },
  {
    id: 4,
    title: 'Contemporary Villa',
    location: 'Jubilee Hills, Hyderabad',
    city: 'Hyderabad',
    priceInCrores: 95,
    bedrooms: 5,
    bathrooms: 7,
    sqft: 11000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    description: 'A stunning example of modern architecture, this villa features clean lines, expansive glass walls, and an open floor plan that maximizes natural light. Located in Hyderabad\'s most exclusive gated community with world-class amenities.',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    ],
    features: ['Minimalist design by renowned architect', 'Floor-to-ceiling glass walls', 'Infinity edge pool', 'Home automation throughout', 'Gourmet kitchen with island', 'Master suite with private terrace', 'Gym and yoga studio', 'Gated community with golf course'],
    position: { x: '35%', y: '55%' },
  },
  {
    id: 5,
    title: 'Penthouse Suite',
    location: 'Worli, Mumbai',
    city: 'Mumbai',
    priceInCrores: 225,
    bedrooms: 4,
    bathrooms: 5,
    sqft: 9500,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    description: 'The crown jewel of Mumbai\'s skyline, this ultra-luxury penthouse spans the entire top floor with wraparound terraces offering 360-degree views. Designed by an internationally acclaimed architect, every detail speaks to uncompromising luxury.',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
    ],
    features: ['Private rooftop terrace with infinity pool', 'Helipad access', 'Jacuzzi with city views', 'Wine cellar and tasting room', 'Private cinema', 'Panic room', 'Imported oak flooring', 'Lutron lighting system'],
    position: { x: '65%', y: '50%' },
  },
  {
    id: 6,
    title: 'Heritage Mansion',
    location: 'Ballygunge, Kolkata',
    city: 'Kolkata',
    priceInCrores: 55,
    bedrooms: 8,
    bathrooms: 10,
    sqft: 18000,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    description: 'A meticulously restored colonial-era mansion that has housed Kolkata\'s elite for generations. Original architectural details including Corinthian columns and ornate moldings have been preserved, while all modern systems have been discretely upgraded.',
    galleryImages: [
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    ],
    features: ['Heritage conservation status', 'Original teak wood paneling', 'Ballroom with 20-foot ceilings', 'Library with built-in shelving', 'Multiple living areas', 'Staff quarters', 'Carriage house converted to garage', 'Security systems'],
  },
]

export function formatCurrency(amount: number): string {
  const crores = amount / 10000000
  if (crores >= 1) {
    return `₹${crores.toFixed(0)} Cr`
  }
  const lakhs = amount / 100000
  return `₹${lakhs.toFixed(0)} L`
}

export function getPropertyById(id: number): Property | undefined {
  return properties.find(p => p.id === id)
}

export function getPropertiesForMap(): Property[] {
  return properties.filter(p => p.position)
}
