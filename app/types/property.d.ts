export type Property = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  location: string;
  price_per_night: number;
  postalCode: string;
  pictures: string[];
  equipments: string[];
  tags: string[];
  rating_avg: number;
  rating_count: number;
  host: {
    id: number;
    name: string;
    picture: string;
  };
};

export type CreatePropertyPayload = {
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  host_id: string | number;
  cover: string | null;
  pictures: string[];
  equipments: string[];
  tags: string[];
};
