export type PropertyInfoSectionProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;

  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;

  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export type PropertyImagesSectionProps = {
  coverPicture: File | null;
  setCoverPicture: React.Dispatch<React.SetStateAction<File | null>>;

  propertyPictures: File[];
  setPropertyPictures: React.Dispatch<React.SetStateAction<File[]>>;
};
