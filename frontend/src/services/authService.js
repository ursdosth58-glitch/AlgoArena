import API from "./api";

export const registerUser = async (formData) => {
  const response = await API.post(
    "/auth/register",
    formData
  );

  return response.data;
};