import DataTable from "@/components/DataTable";
import GeometricPattern from "@/components/GeometricPattern";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <GeometricPattern />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <DataTable />
      </div>
    </div>
  );
};

export default Index;
