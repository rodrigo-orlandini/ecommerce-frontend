'use client';

import { FormEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import Close from '@/icons/Close';

interface Brand {
  id: string;
  name: string;
  description: string;
}

interface BrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBrand: Brand | null;
  formData: { name: string; description: string };
  onFormDataChange: (data: { name: string; description: string }) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function BrandModal({
  isOpen,
  onClose,
  selectedBrand,
  formData,
  onFormDataChange,
  onSubmit,
}: BrandModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedBrand ? 'Editar Marca' : 'Nova Marca'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <Close className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={onSubmit} className="p-6 space-y-4">
            <Input
              id="name"
              label="Nome"
              value={formData.name}
              onChange={(e) =>
                onFormDataChange({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Nike, Apple, Samsung..."
            />

            <Textarea
              id="description"
              label="Descrição"
              value={formData.description}
              onChange={(e) =>
                onFormDataChange({ ...formData, description: e.target.value })
              }
              placeholder="Descreva a marca..."
            />

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                Cancelar
              </button>
              <Button type="submit" className="flex-1 cursor-pointer">
                {selectedBrand ? 'Salvar Alterações' : 'Criar Marca'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
