import Button from '@/components/Button';
import SmoothButton from '@/components/SmoothButton';

interface Brand {
  id: string;
  name: string;
  description: string;
}

interface BrandListProps {
  brands: Brand[];
  deleteConfirmId: string | null;
  setDeleteConfirmId: (id: string | null) => void;
  onEdit: (brand: Brand) => void;
  onDelete: (id: string) => void;
}

export default function BrandList({
  brands,
  deleteConfirmId,
  setDeleteConfirmId,
  onEdit,
  onDelete,
}: BrandListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden group flex flex-col"
        >
          <div className="p-6 flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {brand.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-3">
              {brand.description}
            </p>
          </div>
          <div className="px-6 pb-6 flex gap-2 mt-auto">
            <SmoothButton variant="blue" onClick={() => onEdit(brand)}>
              Editar
            </SmoothButton>
            {deleteConfirmId === brand.id ? (
              <div className="flex gap-2 flex-1">
                <Button
                  onClick={() => onDelete(brand.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600"
                >
                  Confirmar
                </Button>
                <SmoothButton
                  variant="gray"
                  onClick={() => setDeleteConfirmId(null)}
                >
                  Cancelar
                </SmoothButton>
              </div>
            ) : (
              <SmoothButton
                variant="red"
                onClick={() => setDeleteConfirmId(brand.id)}
              >
                Excluir
              </SmoothButton>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

