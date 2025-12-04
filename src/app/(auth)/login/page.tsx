'use client';

import '@/lib/axios';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { validateForm } from '@/utils/validation';
import { useLoginAdmin } from '@/api/authentication/authentication';

const loginSchema = z.object({
  email: z.email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: loginAdmin } = useLoginAdmin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateForm(loginSchema, {
      email,
      password,
    });

    if (validation.error) {
      toast.error(validation.error);
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginAdmin({
        data: {
          email,
          password,
        },
      });

      toast.success('Login realizado com sucesso!');

      router.replace('/home');
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        'Erro ao fazer login. Tente novamente.';

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="seu@email.com"
              disabled={isLoading}
            />

            <Input
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={isLoading}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Entrando..."
              disabled={!email || !password}
            >
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
