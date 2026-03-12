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

/**
 * Upload une image vers le backend.
 *
 * @param {UploadImageParams} params - Les paramètres nécessaires pour l'upload de l'image.
 * @returns {Promise<UploadImageResponse>} Les informations de l'image uploadée.
 * @throws {Error} Si l'upload échoue.
 */
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

  const response = await api.post<UploadImageResponse>(
    "/api/uploads/image",
    formData,
  );

  return response.data;
}
