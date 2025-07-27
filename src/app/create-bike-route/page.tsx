import CreateBikeRouteForm from "@/context/bike-route/components/CreateBikeRouteForm";

export default function CreateBikeRoutePage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear nueva ruta</h1>
      <CreateBikeRouteForm />
    </div>
  );
}
