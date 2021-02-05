export interface Badge {
  readonly content: string;
  readonly imageUrl: string;
  readonly title: string;
}

export interface Listing {
  readonly thumbnailUrl: string;
  readonly rank: number;
  readonly name: string;
  readonly badges: Badge[];
  readonly tagline: string;
  readonly neighborhood: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly repeatClientCount: number;
  readonly reviewCount: number;
  readonly ratingAverage: number;
  readonly featuredReview: string;
  readonly currencySymbol: string;
  readonly price: number;
  readonly priceUnit: string;
  readonly webUrl: string;
}

export interface Results {
  readonly isFetching: boolean;
  readonly hasFailed: boolean;
  readonly isStale: boolean;
  readonly listings: Listing[];
}
