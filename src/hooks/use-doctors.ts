import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctor.service";

export function useDoctors() {
  return useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
}