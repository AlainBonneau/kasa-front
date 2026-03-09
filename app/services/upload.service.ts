import { api } from "../api/axioxConfig";

type UploadImageParams = {
  file: File;
  purpose?: "property-cover" | "property-picture" | "user-picture" | "other";
  propertyId?: string;
};

type UploadImageResponse = {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
  purpose?: string | null;
  property_id?: string;
  instructions?: string;
};

export async function uploadImage({
  file,
  purpose = "other",
  propertyId,
}: UploadImageParams): Promise<UploadImageResponse> {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("purpose", purpose);

  if (propertyId) {
    formData.append("property_id", propertyId);
  }

  const response = await api.post("/api/uploads/image", formData);
  return response.data;
}
