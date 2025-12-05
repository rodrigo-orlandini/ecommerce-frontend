'use client';

import { useState, FormEvent } from 'react';
import { z } from 'zod';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import { validateForm } from '@/utils/validation';
import EmptyBrandsList from './EmptyBrandsList';
import BrandModal from './BrandModal';
import BrandList from './BrandList';

interface Brand {
  id: string;
  name: string;
  description: string;
}

// Mock data
const initialBrands: Brand[] = [
  {
    id: '1',
    name: 'Nike',
    description:
      'Just Do It. Leading athletic footwear and apparel brand known for innovation and performance.',
  },
  {
    id: '2',
    name: 'Apple',
    description:
      'Think Different. Technology company that revolutionized personal computing and mobile devices.',
  },
  {
    id: '3',
    name: 'Samsung',
    description:
      'Innovation for Everyone. Global technology leader in smartphones, electronics, and home appliances.',
  },
  {
    id: '4',
    name: 'Sony',
    description:
      'Be Moved. Japanese multinational conglomerate specializing in electronics, gaming, and entertainment.',
  },
  {
    id: '5',
    name: 'Adidas',
    description:
      'Impossible is Nothing. German sportswear manufacturer known for its three-stripe logo and athletic excellence.',
  },
];

const brandSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().optional(),
});

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const openCreateModal = () => {
    setSelectedBrand(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (brand: Brand) => {
    setSelectedBrand(brand);
    setFormData({ name: brand.name, description: brand.description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
    setFormData({ name: '', description: '' });
  };

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateForm(brandSchema, {
      name: formData.name,
      description: formData.description,
    });

    if (validation.error) {
      toast.error(validation.error);
      return;
    }

    try {
      const newBrand: Brand = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
      };
      setBrands([...brands, newBrand]);
      toast.success('Marca criada com sucesso!');
      closeModal();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        'Erro ao criar marca. Tente novamente.';

      toast.error(errorMessage);
    }
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateForm(brandSchema, {
      name: formData.name,
      description: formData.description,
    });

    if (validation.error) {
      toast.error(validation.error);
      return;
    }

    try {
      setBrands(
        brands.map((brand) =>
          brand.id === selectedBrand!.id
            ? {
                ...brand,
                name: formData.name,
                description: formData.description,
              }
            : brand
        )
      );
      toast.success('Marca atualizada com sucesso!');
      closeModal();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        'Erro ao atualizar marca. Tente novamente.';

      toast.error(errorMessage);
    }
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter((brand) => brand.id !== id));
    setDeleteConfirmId(null);
    toast.success('Marca excluída com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marcas</h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas marcas e suas descrições
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="w-auto! px-3! text-sm bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          Nova Marca
        </Button>
      </div>

      {brands.length === 0 ? (
        <EmptyBrandsList onCreateClick={openCreateModal} />
      ) : (
        <BrandList
          brands={brands}
          deleteConfirmId={deleteConfirmId}
          setDeleteConfirmId={setDeleteConfirmId}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      <BrandModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedBrand={selectedBrand}
        formData={formData}
        onFormDataChange={setFormData}
        onSubmit={selectedBrand ? handleEdit : handleCreate}
      />
    </div>
  );
}
