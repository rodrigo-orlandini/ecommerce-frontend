import Button from '@/components/Button';
import Tag from '@/icons/Tag';

interface EmptyBrandsListProps {
  onCreateClick: () => void;
}

export default function EmptyBrandsList({
  onCreateClick,
}: EmptyBrandsListProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tag className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma marca encontrada
        </h3>
        <p className="text-gray-600 mb-6">
          Comece criando sua primeira marca
        </p>
        <Button
          onClick={onCreateClick}
          className="w-auto px-6 cursor-pointer"
        >
          Criar Primeira Marca
        </Button>
      </div>
    </div>
  );
}

