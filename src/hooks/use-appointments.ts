import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/services/appointment.service";

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}