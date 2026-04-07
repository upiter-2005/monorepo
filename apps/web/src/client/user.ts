export async function getUsers(query: string | undefined) {
  const response = await fetch(`${import.meta.env.VITE_API_PATH}/users?${query}`);
  const data = await response.json();
  return data;
}
