import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Edit2, Check, X } from "lucide-react";
import GeometricPattern from "./GeometricPattern";
import { useState } from "react";

interface DataItem {
  id: number;
  interface: string;
  cidade: string;
  bairro: string;
  tecnologia: string;
  disponibilidade: string;
  status: string;
  qtdAtivos: number;
}

const DataTable = () => {
  const [data, setData] = useState<DataItem[]>([
    {
      id: 1,
      interface: "API Gateway",
      cidade: "São Paulo",
      bairro: "Vila Olímpia",
      tecnologia: "Node.js",
      disponibilidade: "99.9%",
      status: "ativo",
      qtdAtivos: 15
    },
    {
      id: 2,
      interface: "Web Portal",
      cidade: "Rio de Janeiro",
      bairro: "Copacabana",
      tecnologia: "React",
      disponibilidade: "99.7%",
      status: "ativo",
      qtdAtivos: 8
    },
    {
      id: 3,
      interface: "Mobile App",
      cidade: "Belo Horizonte",
      bairro: "Savassi",
      tecnologia: "React Native",
      disponibilidade: "99.5%",
      status: "manutenção",
      qtdAtivos: 12
    },
    {
      id: 4,
      interface: "Database",
      cidade: "Brasília",
      bairro: "Asa Sul",
      tecnologia: "PostgreSQL",
      disponibilidade: "99.8%",
      status: "ativo",
      qtdAtivos: 3
    },
    {
      id: 5,
      interface: "Analytics",
      cidade: "Salvador",
      bairro: "Barra",
      tecnologia: "Python",
      disponibilidade: "99.6%",
      status: "ativo",
      qtdAtivos: 6
    }
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ativo":
        return "default";
      case "manutenção":
        return "secondary";
      default:
        return "outline";
    }
  };

  const handleEdit = (id: number, field: string, currentValue: string | number) => {
    setEditingId(id);
    setEditingField(field);
    setTempValue(String(currentValue));
  };

  const handleSave = (id: number, field: string) => {
    setData(prev => prev.map(item => {
      if (item.id === id) {
        // Handle numeric fields properly
        const newValue = field === 'qtdAtivos' ? parseInt(tempValue) || 0 : tempValue;
        return { ...item, [field]: newValue };
      }
      return item;
    }));
    setEditingId(null);
    setEditingField(null);
    setTempValue("");
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingField(null);
    setTempValue("");
  };

  const renderEditableField = (item: DataItem, field: string, displayValue: string | number) => {
    const isEditing = editingId === item.id && editingField === field;
    
    if (isEditing) {
      if (field === 'status') {
        return (
          <div className="flex items-center gap-2">
            <Select value={tempValue} onValueChange={setTempValue}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">ativo</SelectItem>
                <SelectItem value="manutenção">manutenção</SelectItem>
                <SelectItem value="inativo">inativo</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="ghost" onClick={() => handleSave(item.id, field)}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      } else if (field === 'tecnologia') {
        return (
          <div className="flex items-center gap-2">
            <Select value={tempValue} onValueChange={setTempValue}>
              <SelectTrigger className="w-32 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Node.js">Node.js</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="React Native">React Native</SelectItem>
                <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" variant="ghost" onClick={() => handleSave(item.id, field)}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      } else {
        return (
          <div className="flex items-center gap-2">
            <Input 
              value={tempValue} 
              onChange={(e) => setTempValue(e.target.value)}
              className="w-32 h-8"
              type={field === 'qtdAtivos' ? 'number' : 'text'}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(item.id, field);
                if (e.key === 'Escape') handleCancel();
              }}
            />
            <Button size="sm" variant="ghost" onClick={() => handleSave(item.id, field)}>
              <Check className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" onClick={handleCancel}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        );
      }
    }

    return (
      <div 
        className="flex items-center gap-2 group cursor-pointer hover:bg-muted/50 p-1 rounded"
        onClick={() => handleEdit(item.id, field, item[field])}
      >
        <span>{displayValue}</span>
        <Edit2 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Monitoramento</h1>
          <p className="text-muted-foreground">Gerencie interfaces e tecnologias da empresa</p>
        </div>
        <GeometricPattern className="" variant="decorative" />
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
                <th className="text-left p-4 font-semibold text-foreground">Qtd de Ativos</th>
                <th className="text-left p-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={item.id} 
                  className="border-t border-border hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td className="p-4">
                    <div className="font-medium text-foreground">{item.interface}</div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {renderEditableField(item, 'cidade', item.cidade)}
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {renderEditableField(item, 'bairro', item.bairro)}
                  </td>
                  <td className="p-4">
                    {editingId === item.id && editingField === 'tecnologia' ? (
                      renderEditableField(item, 'tecnologia', item.tecnologia)
                    ) : (
                      <div onClick={() => handleEdit(item.id, 'tecnologia', item.tecnologia)} className="cursor-pointer group">
                        <Badge variant="outline" className="border-primary text-primary group-hover:bg-muted/50">
                          {item.tecnologia}
                          <Edit2 className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium text-success">
                        {renderEditableField(item, 'disponibilidade', item.disponibilidade)}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-foreground">
                      {renderEditableField(item, 'qtdAtivos', item.qtdAtivos)}
                    </div>
                  </td>
                  <td className="p-4">
                    {editingId === item.id && editingField === 'status' ? (
                      renderEditableField(item, 'status', item.status)
                    ) : (
                      <div onClick={() => handleEdit(item.id, 'status', item.status)} className="cursor-pointer group">
                        <Badge variant={getStatusVariant(item.status)} className="group-hover:bg-muted/50">
                          {item.status}
                          <Edit2 className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Badge>
                      </div>
                    )}
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
              <p className="text-2xl font-bold text-pattern-blue">{data.length}</p>
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
              <p className="text-2xl font-bold text-pattern-green">{data.filter(item => item.status === "ativo").length}</p>
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