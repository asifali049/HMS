export async function getPatients() {
  const res = await fetch("/api/patients");

  if (!res.ok) {
    throw new Error("Failed to fetch patients");
  }

  return res.json();
}