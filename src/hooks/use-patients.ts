import { useQuery } from "@tanstack/react-query";
import { getPatients } from "@/services/patient.service";

export function usePatients() {
  return useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
}