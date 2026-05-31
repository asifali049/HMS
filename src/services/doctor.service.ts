export async function getDoctors() {
  const res = await fetch("/api/doctors");

  if (!res.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return res.json();
}