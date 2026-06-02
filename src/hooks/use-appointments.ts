import { useQuery } from "@tanstack/react-query";

async function getAppointments() {
  const response = await fetch(
    "/api/appointments"
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch appointments"
    );
  }

  return response.json();
}

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}