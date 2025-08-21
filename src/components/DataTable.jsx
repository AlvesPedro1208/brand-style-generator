import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";
import GeometricPattern from "./GeometricPattern";

const DataTable = () => {
  const mockData = [
    {
      id: 1,
      interface: "API Gateway",
      cidade: "São Paulo",
      bairro: "Vila Olímpia",
      tecnologia: "Node.js",
      disponibilidade: "99.9%",
      status: "ativo"
    },
    {
      id: 2,
      interface: "Web Portal",
      cidade: "Rio de Janeiro",
      bairro: "Copacabana",
      tecnologia: "React",
      disponibilidade: "99.7%",
      status: "ativo"
    },
    {
      id: 3,
      interface: "Mobile App",
      cidade: "Belo Horizonte",
      bairro: "Savassi",
      tecnologia: "React Native",
      disponibilidade: "99.5%",
      status: "manutenção"
    },
    {
      id: 4,
      interface: "Database",
      cidade: "Brasília",
      bairro: "Asa Sul",
      tecnologia: "PostgreSQL",
      disponibilidade: "99.8%",
      status: "ativo"
    },
    {
      id: 5,
      interface: "Analytics",
      cidade: "Salvador",
      bairro: "Barra",
      tecnologia: "Python",
      disponibilidade: "99.6%",
      status: "ativo"
    }
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "ativo":
        return "default";
      case "manutenção":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Monitoramento</h1>
          <p className="text-muted-foreground">Gerencie interfaces e tecnologias da empresa</p>
        </div>
        <GeometricPattern variant="decorative" />
      </div>

      {/* Filters */}
      <Card className="p-6 shadow-card relative overflow-hidden">
        <GeometricPattern className="opacity-30" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por interface..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
                <SelectItem value="bh">Belo Horizonte</SelectItem>
                <SelectItem value="bsb">Brasília</SelectItem>
                <SelectItem value="salvador">Salvador</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Tecnologia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nodejs">Node.js</SelectItem>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="react-native">React Native</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="python">Python</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Disponibilidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">≥ 99%</SelectItem>
                <SelectItem value="medium">90-99%</SelectItem>
                <SelectItem value="low">&lt; 90%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros Avançados
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Table */}
      <Card className="shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold text-foreground">Interface</th>
                <th className="text-left p-4 font-semibold text-foreground">Cidade</th>
                <th className="text-left p-4 font-semibold text-foreground">Bairro</th>
                <th className="text-left p-4 font-semibold text-foreground">Tecnologia</th>
                <th className="text-left p-4 font-semibold text-foreground">Disponibilidade</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="border-t border-border hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="p-4">
                    <div className="font-medium text-foreground">{item.interface}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">{item.cidade}</td>
                  <td className="p-4 text-muted-foreground">{item.bairro}</td>
                  <td className="p-4">
                    <Badge variant="outline" className="border-primary text-primary">
                      {item.tecnologia}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-success">{item.disponibilidade}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={getStatusVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-card bg-gradient-to-br from-pattern-blue/5 to-pattern-blue/10 border-pattern-blue/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Interfaces</p>
              <p className="text-2xl font-bold text-pattern-blue">{mockData.length}</p>
            </div>
            <div className="w-12 h-12 bg-pattern-blue/10 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-pattern-blue rounded-sm"></div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-card bg-gradient-to-br from-pattern-orange/5 to-pattern-orange/10 border-pattern-orange/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Disponibilidade Média</p>
              <p className="text-2xl font-bold text-pattern-orange">99.7%</p>
            </div>
            <div className="w-12 h-12 bg-pattern-orange/10 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-pattern-orange rounded-sm"></div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-card bg-gradient-to-br from-pattern-green/5 to-pattern-green/10 border-pattern-green/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Sistemas Ativos</p>
              <p className="text-2xl font-bold text-pattern-green">{mockData.filter(item => item.status === "ativo").length}</p>
            </div>
            <div className="w-12 h-12 bg-pattern-green/10 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-pattern-green rounded-sm"></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataTable;