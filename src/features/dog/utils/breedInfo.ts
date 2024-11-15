import { EBreed } from '../types/EBreed';

interface BreedInfo {
  energyLevel: number;
  displayName: string;
}

const breedInfoMap: Record<EBreed, BreedInfo> = {
  // Toy Group
  [EBreed.AFFENPINSCHER]: { energyLevel: 5, displayName: 'Affenpinscher' },
  [EBreed.AUSTRALIAN_SILKY_TERRIER]: {
    energyLevel: 6,
    displayName: 'Australian Silky Terrier',
  },
  [EBreed.BICHON_FRISE]: { energyLevel: 5, displayName: 'Bichon Frisé' },
  [EBreed.BOLOGNESE]: { energyLevel: 4, displayName: 'Bolognese' },
  [EBreed.CAVALIER_KING_CHARLES_SPANIEL]: {
    energyLevel: 4,
    displayName: 'Cavalier King Charles Spaniel',
  },
  [EBreed.CHIHUAHUA_LONG_COAT]: {
    energyLevel: 4,
    displayName: 'Chihuahua (Long Coat)',
  },
  [EBreed.CHIHUAHUA_SMOOTH_COAT]: {
    energyLevel: 4,
    displayName: 'Chihuahua (Smooth Coat)',
  },
  [EBreed.CHINESE_CRESTED_DOG]: {
    energyLevel: 3,
    displayName: 'Chinese Crested Dog',
  },
  [EBreed.COTON_DE_TULEAR]: { energyLevel: 5, displayName: 'Coton de Tulear' },
  [EBreed.ENGLISH_TOY_TERRIER]: {
    energyLevel: 5,
    displayName: 'English Toy Terrier',
  },
  [EBreed.GRIFFON_BRUXELLOIS]: {
    energyLevel: 5,
    displayName: 'Griffon Bruxellois',
  },
  [EBreed.HAVANESE]: { energyLevel: 4, displayName: 'Havanese' },
  [EBreed.ITALIAN_GREYHOUND]: {
    energyLevel: 6,
    displayName: 'Italian Greyhound',
  },
  [EBreed.JAPANESE_CHIN]: { energyLevel: 3, displayName: 'Japanese Chin' },
  [EBreed.KING_CHARLES_SPANIEL]: {
    energyLevel: 3,
    displayName: 'King Charles Spaniel',
  },
  [EBreed.LOWCHEN]: { energyLevel: 5, displayName: 'Löwchen' },
  [EBreed.MALTESE]: { energyLevel: 4, displayName: 'Maltese' },
  [EBreed.MINIATURE_PINSCHER]: {
    energyLevel: 7,
    displayName: 'Miniature Pinscher',
  },
  [EBreed.PAPILLON]: { energyLevel: 8, displayName: 'Papillon' },
  [EBreed.PEKINGESE]: { energyLevel: 3, displayName: 'Pekingese' },
  [EBreed.POMERANIAN]: { energyLevel: 6, displayName: 'Pomeranian' },
  [EBreed.PUG]: { energyLevel: 4, displayName: 'Pug' },
  [EBreed.RUSSIAN_TOY]: { energyLevel: 6, displayName: 'Russian Toy' },
  [EBreed.TIBETAN_SPANIEL]: { energyLevel: 4, displayName: 'Tibetan Spaniel' },
  [EBreed.YORKSHIRE_TERRIER]: {
    energyLevel: 5,
    displayName: 'Yorkshire Terrier',
  },

  // Terrier Group
  [EBreed.AIREDALE_TERRIER]: {
    energyLevel: 7,
    displayName: 'Airedale Terrier',
  },
  [EBreed.AMERICAN_STAFFORDSHIRE_TERRIER]: {
    energyLevel: 6,
    displayName: 'American Staffordshire Terrier',
  },
  [EBreed.AUSTRALIAN_TERRIER]: {
    energyLevel: 7,
    displayName: 'Australian Terrier',
  },
  [EBreed.BEDLINGTON_TERRIER]: {
    energyLevel: 6,
    displayName: 'Bedlington Terrier',
  },
  [EBreed.BORDER_TERRIER]: { energyLevel: 8, displayName: 'Border Terrier' },
  [EBreed.BULL_TERRIER]: { energyLevel: 5, displayName: 'Bull Terrier' },
  [EBreed.BULL_TERRIER_MINIATURE]: {
    energyLevel: 5,
    displayName: 'Bull Terrier (Miniature)',
  },
  [EBreed.CAIRN_TERRIER]: { energyLevel: 6, displayName: 'Cairn Terrier' },
  [EBreed.CESKY_TERRIER]: { energyLevel: 5, displayName: 'Cesky Terrier' },
  [EBreed.DANDIE_DINMONT_TERRIER]: {
    energyLevel: 4,
    displayName: 'Dandie Dinmont Terrier',
  },
  [EBreed.FOX_TERRIER_SMOOTH]: {
    energyLevel: 8,
    displayName: 'Fox Terrier (Smooth)',
  },
  [EBreed.FOX_TERRIER_WIRE]: {
    energyLevel: 8,
    displayName: 'Fox Terrier (Wire)',
  },
  [EBreed.GLEN_OF_IMAAL_TERRIER]: {
    energyLevel: 5,
    displayName: 'Glen of Imaal Terrier',
  },
  [EBreed.IRISH_TERRIER]: { energyLevel: 7, displayName: 'Irish Terrier' },
  [EBreed.JACK_RUSSELL_TERRIER]: {
    energyLevel: 9,
    displayName: 'Jack Russell Terrier',
  },
  [EBreed.KERRY_BLUE_TERRIER]: {
    energyLevel: 6,
    displayName: 'Kerry Blue Terrier',
  },
  [EBreed.LAKELAND_TERRIER]: {
    energyLevel: 7,
    displayName: 'Lakeland Terrier',
  },
  [EBreed.MANCHESTER_TERRIER]: {
    energyLevel: 7,
    displayName: 'Manchester Terrier',
  },
  [EBreed.NORFOLK_TERRIER]: { energyLevel: 6, displayName: 'Norfolk Terrier' },
  [EBreed.NORWICH_TERRIER]: { energyLevel: 6, displayName: 'Norwich Terrier' },
  [EBreed.PARSON_RUSSELL_TERRIER]: {
    energyLevel: 9,
    displayName: 'Parson Russell Terrier',
  },
  [EBreed.SCOTTISH_TERRIER]: {
    energyLevel: 5,
    displayName: 'Scottish Terrier',
  },
  [EBreed.SEALYHAM_TERRIER]: {
    energyLevel: 4,
    displayName: 'Sealyham Terrier',
  },
  [EBreed.SKYE_TERRIER]: { energyLevel: 4, displayName: 'Skye Terrier' },
  [EBreed.SOFT_COATED_WHEATEN_TERRIER]: {
    energyLevel: 6,
    displayName: 'Soft Coated Wheaten Terrier',
  },
  [EBreed.STAFFORDSHIRE_BULL_TERRIER]: {
    energyLevel: 6,
    displayName: 'Staffordshire Bull Terrier',
  },
  [EBreed.TENTERFIELD_TERRIER]: {
    energyLevel: 7,
    displayName: 'Tenterfield Terrier',
  },
  [EBreed.WELSH_TERRIER]: { energyLevel: 6, displayName: 'Welsh Terrier' },
  [EBreed.WEST_HIGHLAND_WHITE_TERRIER]: {
    energyLevel: 5,
    displayName: 'West Highland White Terrier',
  },

  // Gundog Group
  [EBreed.BRITTANY]: { energyLevel: 9, displayName: 'Brittany' },
  [EBreed.CHESAPEAKE_BAY_RETRIEVER]: {
    energyLevel: 7,
    displayName: 'Chesapeake Bay Retriever',
  },
  [EBreed.CLUMBER_SPANIEL]: { energyLevel: 5, displayName: 'Clumber Spaniel' },
  [EBreed.COCKER_SPANIEL]: { energyLevel: 6, displayName: 'Cocker Spaniel' },
  [EBreed.COCKER_SPANIEL_AMERICAN]: {
    energyLevel: 6,
    displayName: 'Cocker Spaniel (American)',
  },
  [EBreed.CURLY_COATED_RETRIEVER]: {
    energyLevel: 7,
    displayName: 'Curly Coated Retriever',
  },
  [EBreed.ENGLISH_SETTER]: { energyLevel: 8, displayName: 'English Setter' },
  [EBreed.ENGLISH_SPRINGER_SPANIEL]: {
    energyLevel: 8,
    displayName: 'English Springer Spaniel',
  },
  [EBreed.FIELD_SPANIEL]: { energyLevel: 6, displayName: 'Field Spaniel' },
  [EBreed.FLAT_COATED_RETRIEVER]: {
    energyLevel: 8,
    displayName: 'Flat Coated Retriever',
  },
  [EBreed.GERMAN_SHORTHAIRED_POINTER]: {
    energyLevel: 9,
    displayName: 'German Shorthaired Pointer',
  },
  [EBreed.GERMAN_WIREHAIRED_POINTER]: {
    energyLevel: 9,
    displayName: 'German Wirehaired Pointer',
  },
  [EBreed.GOLDEN_RETRIEVER]: {
    energyLevel: 7,
    displayName: 'Golden Retriever',
  },
  [EBreed.GORDON_SETTER]: { energyLevel: 7, displayName: 'Gordon Setter' },
  [EBreed.HUNGARIAN_VIZSLA]: {
    energyLevel: 9,
    displayName: 'Hungarian Vizsla',
  },
  [EBreed.HUNGARIAN_WIREHAIRED_VIZSLA]: {
    energyLevel: 9,
    displayName: 'Hungarian Wirehaired Vizsla',
  },
  [EBreed.IRISH_RED_AND_WHITE_SETTER]: {
    energyLevel: 8,
    displayName: 'Irish Red and White Setter',
  },
  [EBreed.IRISH_SETTER]: { energyLevel: 8, displayName: 'Irish Setter' },
  [EBreed.ITALIAN_SPINONE]: { energyLevel: 6, displayName: 'Italian Spinone' },
  [EBreed.LABRADOR_RETRIEVER]: {
    energyLevel: 7,
    displayName: 'Labrador Retriever',
  },
  [EBreed.LAGOTTO_ROMAGNOLO]: {
    energyLevel: 7,
    displayName: 'Lagotto Romagnolo',
  },
  [EBreed.LARGE_MUNSTERLANDER]: {
    energyLevel: 8,
    displayName: 'Large Munsterlander',
  },
  [EBreed.NOVA_SCOTIA_DUCK_TOLLING_RETRIEVER]: {
    energyLevel: 7,
    displayName: 'Nova Scotia Duck Tolling Retriever',
  },
  [EBreed.POINTER]: { energyLevel: 9, displayName: 'Pointer' },
  [EBreed.SUSSEX_SPANIEL]: { energyLevel: 5, displayName: 'Sussex Spaniel' },
  [EBreed.WEIMARANER]: { energyLevel: 9, displayName: 'Weimaraner' },
  [EBreed.WEIMARANER_LONG_HAIRED]: {
    energyLevel: 9,
    displayName: 'Weimaraner (Long-haired)',
  },
  [EBreed.WELSH_SPRINGER_SPANIEL]: {
    energyLevel: 7,
    displayName: 'Welsh Springer Spaniel',
  },

  // Hound Group
  [EBreed.AFGHAN_HOUND]: { energyLevel: 7, displayName: 'Afghan Hound' },
  [EBreed.AZAWAKH]: { energyLevel: 8, displayName: 'Azawakh' },
  [EBreed.BASENJI]: { energyLevel: 7, displayName: 'Basenji' },
  [EBreed.BASSET_FAUVE_DE_BRETAGNE]: {
    energyLevel: 6,
    displayName: 'Basset Fauve de Bretagne',
  },
  [EBreed.BASSET_HOUND]: { energyLevel: 4, displayName: 'Basset Hound' },
  [EBreed.BEAGLE]: { energyLevel: 8, displayName: 'Beagle' },
  [EBreed.BLOODHOUND]: { energyLevel: 6, displayName: 'Bloodhound' },
  [EBreed.BORZOI]: { energyLevel: 6, displayName: 'Borzoi' },
  [EBreed.DACHSHUND_LONG_HAIRED]: {
    energyLevel: 5,
    displayName: 'Dachshund (Long Haired)',
  },
  [EBreed.DACHSHUND_MINIATURE_LONG_HAIRED]: {
    energyLevel: 5,
    displayName: 'Dachshund (Miniature Long Haired)',
  },
  [EBreed.DACHSHUND_MINIATURE_SMOOTH_HAIRED]: {
    energyLevel: 5,
    displayName: 'Dachshund (Miniature Smooth Haired)',
  },
  [EBreed.DACHSHUND_MINIATURE_WIRE_HAIRED]: {
    energyLevel: 5,
    displayName: 'Dachshund (Miniature Wire Haired)',
  },
  [EBreed.DACHSHUND_SMOOTH_HAIRED]: {
    energyLevel: 5,
    displayName: 'Dachshund (Smooth Haired)',
  },
  [EBreed.DACHSHUND_WIRE_HAIRED]: {
    energyLevel: 5,
    displayName: 'Dachshund (Wire Haired)',
  },
  [EBreed.DEERHOUND]: { energyLevel: 6, displayName: 'Deerhound' },
  [EBreed.FINNISH_SPITZ]: { energyLevel: 7, displayName: 'Finnish Spitz' },
  [EBreed.FOXHOUND]: { energyLevel: 8, displayName: 'Foxhound' },
  [EBreed.GREYHOUND]: { energyLevel: 6, displayName: 'Greyhound' },
  [EBreed.HAMILTONSTOVARE]: { energyLevel: 7, displayName: 'Hamiltonstovare' },
  [EBreed.HARRIER]: { energyLevel: 8, displayName: 'Harrier' },
  [EBreed.IBIZAN_HOUND]: { energyLevel: 7, displayName: 'Ibizan Hound' },
  [EBreed.IRISH_WOLFHOUND]: { energyLevel: 5, displayName: 'Irish Wolfhound' },
  [EBreed.NORWEGIAN_ELKHOUND]: {
    energyLevel: 7,
    displayName: 'Norwegian Elkhound',
  },
  [EBreed.OTTERHOUND]: { energyLevel: 7, displayName: 'Otterhound' },
  [EBreed.PETIT_BASSET_GRIFFON_VENDEEN]: {
    energyLevel: 6,
    displayName: 'Petit Basset Griffon Vendéen',
  },
  [EBreed.PHARAOH_HOUND]: { energyLevel: 7, displayName: 'Pharaoh Hound' },
  [EBreed.RHODESIAN_RIDGEBACK]: {
    energyLevel: 6,
    displayName: 'Rhodesian Ridgeback',
  },
  [EBreed.SALUKI]: { energyLevel: 7, displayName: 'Saluki' },
  [EBreed.SLOUGHI]: { energyLevel: 6, displayName: 'Sloughi' },
  [EBreed.WHIPPET]: { energyLevel: 6, displayName: 'Whippet' },
  // Working Group
  [EBreed.AKITA]: { energyLevel: 5, displayName: 'Akita' },
  [EBreed.ALASKAN_MALAMUTE]: {
    energyLevel: 7,
    displayName: 'Alaskan Malamute',
  },
  [EBreed.ANATOLIAN_SHEPHERD_DOG]: {
    energyLevel: 6,
    displayName: 'Anatolian Shepherd Dog',
  },
  [EBreed.BERNESE_MOUNTAIN_DOG]: {
    energyLevel: 5,
    displayName: 'Bernese Mountain Dog',
  },
  [EBreed.BOXER]: { energyLevel: 8, displayName: 'Boxer' },
  [EBreed.BULLMASTIFF]: { energyLevel: 4, displayName: 'Bullmastiff' },
  [EBreed.CANADIAN_ESKIMO_DOG]: {
    energyLevel: 7,
    displayName: 'Canadian Eskimo Dog',
  },
  [EBreed.CENTRAL_ASIAN_SHEPHERD_DOG]: {
    energyLevel: 5,
    displayName: 'Central Asian Shepherd Dog',
  },
  [EBreed.DOBERMANN]: { energyLevel: 8, displayName: 'Dobermann' },
  [EBreed.DOGUE_DE_BORDEAUX]: {
    energyLevel: 4,
    displayName: 'Dogue de Bordeaux',
  },
  [EBreed.GERMAN_PINSCHER]: { energyLevel: 7, displayName: 'German Pinscher' },
  [EBreed.GREAT_DANE]: { energyLevel: 4, displayName: 'Great Dane' },
  [EBreed.GREATER_SWISS_MOUNTAIN_DOG]: {
    energyLevel: 5,
    displayName: 'Greater Swiss Mountain Dog',
  },
  [EBreed.GREENLAND_DOG]: { energyLevel: 7, displayName: 'Greenland Dog' },
  [EBreed.HOVAWART]: { energyLevel: 6, displayName: 'Hovawart' },
  [EBreed.JAPANESE_AKITA_INU]: {
    energyLevel: 5,
    displayName: 'Japanese Akita Inu',
  },
  [EBreed.KANGAL_SHEPHERD_DOG]: {
    energyLevel: 6,
    displayName: 'Kangal Shepherd Dog',
  },
  [EBreed.KOMONDOR]: { energyLevel: 5, displayName: 'Komondor' },
  [EBreed.KUVASZ]: { energyLevel: 5, displayName: 'Kuvasz' },
  [EBreed.LEONBERGER]: { energyLevel: 5, displayName: 'Leonberger' },
  [EBreed.MASTIFF]: { energyLevel: 3, displayName: 'Mastiff' },
  [EBreed.NEAPOLITAN_MASTIFF]: {
    energyLevel: 3,
    displayName: 'Neapolitan Mastiff',
  },
  [EBreed.NEWFOUNDLAND]: { energyLevel: 4, displayName: 'Newfoundland' },
  [EBreed.PORTUGUESE_WATER_DOG]: {
    energyLevel: 7,
    displayName: 'Portuguese Water Dog',
  },
  [EBreed.PYRENEAN_MASTIFF]: {
    energyLevel: 4,
    displayName: 'Pyrenean Mastiff',
  },
  [EBreed.PYRENEAN_MOUNTAIN_DOG]: {
    energyLevel: 4,
    displayName: 'Pyrenean Mountain Dog',
  },
  [EBreed.ROTTWEILER]: { energyLevel: 6, displayName: 'Rottweiler' },
  [EBreed.RUSSIAN_BLACK_TERRIER]: {
    energyLevel: 5,
    displayName: 'Russian Black Terrier',
  },
  [EBreed.SAMOYED]: { energyLevel: 7, displayName: 'Samoyed' },
  [EBreed.SCHNAUZER]: { energyLevel: 6, displayName: 'Schnauzer' },
  [EBreed.SCHNAUZER_GIANT]: {
    energyLevel: 6,
    displayName: 'Schnauzer (Giant)',
  },
  [EBreed.SCHNAUZER_MINIATURE]: {
    energyLevel: 6,
    displayName: 'Schnauzer (Miniature)',
  },
  [EBreed.SHIBA_INU]: { energyLevel: 5, displayName: 'Shiba Inu' },
  [EBreed.SHIKOKU]: { energyLevel: 7, displayName: 'Shikoku' },
  [EBreed.SIBERIAN_HUSKY]: { energyLevel: 9, displayName: 'Siberian Husky' },
  [EBreed.SPANISH_MASTIFF]: { energyLevel: 4, displayName: 'Spanish Mastiff' },
  [EBreed.ST_BERNARD]: { energyLevel: 4, displayName: 'St. Bernard' },
  [EBreed.TIBETAN_MASTIFF]: { energyLevel: 4, displayName: 'Tibetan Mastiff' },

  // Utility Group
  [EBreed.AKITA_JAPANESE]: { energyLevel: 5, displayName: 'Akita (Japanese)' },
  [EBreed.AMERICAN_BULLDOG]: {
    energyLevel: 6,
    displayName: 'American Bulldog',
  },
  [EBreed.AUSTRALIAN_BULLDOG]: {
    energyLevel: 5,
    displayName: 'Australian Bulldog',
  },
  [EBreed.BOSTON_TERRIER]: { energyLevel: 5, displayName: 'Boston Terrier' },
  [EBreed.BRITISH_BULLDOG]: { energyLevel: 3, displayName: 'British Bulldog' },
  [EBreed.DALMATIAN]: { energyLevel: 8, displayName: 'Dalmatian' },
  [EBreed.EURASIER]: { energyLevel: 5, displayName: 'Eurasier' },
  [EBreed.FRENCH_BULLDOG]: { energyLevel: 4, displayName: 'French Bulldog' },
  [EBreed.GERMAN_SPITZ_KLEIN]: {
    energyLevel: 7,
    displayName: 'German Spitz (Klein)',
  },
  [EBreed.GERMAN_SPITZ_MITTEL]: {
    energyLevel: 7,
    displayName: 'German Spitz (Mittel)',
  },
  [EBreed.JAPANESE_SPITZ]: { energyLevel: 6, displayName: 'Japanese Spitz' },
  [EBreed.KEESHOND]: { energyLevel: 6, displayName: 'Keeshond' },
  [EBreed.LHASA_APSO]: { energyLevel: 4, displayName: 'Lhasa Apso' },
  [EBreed.PERUVIAN_HAIRLESS_DOG]: {
    energyLevel: 4,
    displayName: 'Peruvian Hairless Dog',
  },
  [EBreed.POODLE_MINIATURE]: {
    energyLevel: 6,
    displayName: 'Poodle (Miniature)',
  },
  [EBreed.POODLE_STANDARD]: {
    energyLevel: 7,
    displayName: 'Poodle (Standard)',
  },
  [EBreed.POODLE_TOY]: { energyLevel: 5, displayName: 'Poodle (Toy)' },
  [EBreed.SCHIPPERKE]: { energyLevel: 7, displayName: 'Schipperke' },
  [EBreed.SHAR_PEI]: { energyLevel: 4, displayName: 'Shar Pei' },
  [EBreed.SHIH_TZU]: { energyLevel: 3, displayName: 'Shih Tzu' },
  [EBreed.TIBETAN_TERRIER]: { energyLevel: 5, displayName: 'Tibetan Terrier' },
  [EBreed.XOLOITZCUINTLE]: { energyLevel: 5, displayName: 'Xoloitzcuintle' },
};

export const getBreedInfo = (breed: EBreed): BreedInfo => {
  return breedInfoMap[breed] || { energyLevel: 5, displayName: breed };
};

// Optional: Helper function to get just the energy level
export const getBreedEnergyLevel = (breed: EBreed): number => {
  return breedInfoMap[breed]?.energyLevel || 5;
};

// Optional: Helper function to get just the display name
export const getBreedDisplayName = (breed: EBreed): string => {
  return breedInfoMap[breed]?.displayName || breed;
};

// Optional: Helper function to get all breeds with a specific energy level
export const getBreedsWithEnergyLevel = (energyLevel: number): EBreed[] => {
  return (
    Object.entries(breedInfoMap)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, info]) => info.energyLevel === energyLevel)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(([breed, _]) => breed as EBreed)
  );
};
