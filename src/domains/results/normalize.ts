import { Listing } from '../../state/results/types';

export interface RawDerivedData {
  readonly zip_code: string;
}

export interface RawResponsiveness {
  readonly photo_rate?: number;
  readonly photo_rate_desc: string;
  readonly percent?: number;
  readonly percent_desc: string;
  readonly time_short_desc: string;
}

export interface RawImage {
  readonly small: string;
}

export interface RawAttribute {
  readonly text: string;
  readonly key: string;
  readonly icon: string;
}

export interface RawPreferences {
  readonly dogs_preferences_attributes: RawAttribute[];
  readonly accepted_dogs_attributes: RawAttribute[];
  readonly dogs_experience_attributes: RawAttribute[];
  readonly attributes: RawAttribute[];
}

export interface RawProviderProfile {
  readonly hosting_service_preferences: RawPreferences;
  readonly traveling_service_preferences: RawPreferences;
  readonly attributes: RawAttribute[];
  readonly years_of_experience: number;
}

export interface RawBadge {
  readonly icon: string;
  readonly description: string;
  readonly title: string;
}

export interface RawPersonSummary {
  readonly responsiveness: RawResponsiveness;
  readonly first_name: string;
  readonly reviews_count: number;
  readonly profile_photo: RawImage;
  readonly ratings_average: string;
  readonly web_url: string;
  readonly images: RawImage[];
  readonly provider_profile: RawProviderProfile;
  readonly attributes: Record<string, RawAttribute>;
  readonly badges: RawBadge[];
}

export interface RawBadgeData {
  readonly content: string;
  readonly image_url: string;
  readonly show_on_search: boolean;
  readonly title: string;
}

export interface RawReview {
  readonly content: string;
  readonly dog_photo_url: string;
}

export interface RawResult {
  readonly rank: number;
  readonly person_summary: RawPersonSummary;
  readonly reviews_count: number;
  readonly neighborhood: string;
  readonly price_unit: string;
  readonly city: string;
  readonly zip: string;
  readonly title: string;
  readonly state: string;
  readonly contact_url: string;
  readonly person_name: string;
  readonly price: string;
  readonly review_text: string;
  readonly review_dog_photo_url: string;
  readonly badge_data: RawBadgeData[];
  readonly repeat_client_count: number;
  readonly reviews: RawReview[];
  readonly ratings_average: string;
  readonly currency_symbol: string;
}

export interface RawSearchResponse {
  readonly results: RawResult[];
}

const rawResultToListing = (rawResult: RawResult): Listing => ({
  thumbnailUrl: rawResult.person_summary.profile_photo.small,
  rank: rawResult.rank,
  name: rawResult.person_summary.first_name,
  badges: rawResult.badge_data.map(rawBadge => ({
    content: rawBadge.content,
    imageUrl: rawBadge.image_url,
    title: rawBadge.title,
  })),
  tagline: rawResult.title,
  neighborhood: rawResult.neighborhood,
  city: rawResult.city,
  state: rawResult.state,
  zip: rawResult.zip,
  repeatClientCount: rawResult.repeat_client_count,
  reviewCount: rawResult.reviews_count,
  ratingAverage: parseFloat(rawResult.ratings_average),
  featuredReview: rawResult.review_text,
  currencySymbol: rawResult.currency_symbol,
  price: parseFloat(rawResult.price),
  priceUnit: rawResult.price_unit,
  webUrl: rawResult.person_summary.web_url,
});

export const normalize = (rawResponse: RawSearchResponse): Listing[] =>
  rawResponse.results.map(rawResultToListing);
