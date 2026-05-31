interface Props {
  appointment: {
    tokenNumber: number;
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
  };
}

export default function AppointmentSlip({
  appointment,
}: Props) {
  return (
    <div className="w-[400px] p-6 border">
      <h1 className="text-center text-2xl font-bold">
        ABC Hospital
      </h1>

      <hr className="my-4" />

      <p>
        <strong>Token:</strong>{" "}
        {appointment.tokenNumber}
      </p>

      <p>
        <strong>Patient:</strong>{" "}
        {appointment.patientName}
      </p>

      <p>
        <strong>Doctor:</strong>{" "}
        {appointment.doctorName}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {appointment.date}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {appointment.time}
      </p>

      <hr className="my-4" />

      <p className="text-center text-sm">
        Please arrive 15 minutes early
      </p>
    </div>
  );
}