export type Property = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  pictures: string[];
  rating_avg: number;
  rating_count: number;
  host: {
    id: number;
    name: string;
    picture: string;
  };
};