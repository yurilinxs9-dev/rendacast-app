import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, User, MessageCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!displayName.trim()) {
          throw new Error('Nome é obrigatório');
        }
        await signUp(email, password, displayName);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8B0000] via-[#DC143C] to-[#FF8C00] bg-clip-text text-transparent tracking-tight mb-6">
            RendaCast
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        <div className="card-shine p-8 rounded-2xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nome
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required={!isLogin}
                  className="bg-background/50"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="bg-background/50"
              />
              {!isLogin && (
                <Alert className="mt-2 bg-muted/50 border-border">
                  <AlertDescription className="text-xs space-y-1">
                    <p className="font-medium text-foreground mb-1.5">
                      {t('common.auth.passwordRequirements')}
                    </p>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t('common.auth.minLength')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t('common.auth.lowercase')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t('common.auth.uppercase')}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t('common.auth.number')}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <Button
              type="submit"
              className="w-full gradient-hero border-0 glow-effect h-12"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Carregando...'
                : isLogin
                ? 'Entrar'
                : 'Criar Conta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
              <span className="text-primary font-semibold">
                {isLogin ? 'Criar conta' : 'Entrar'}
              </span>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Ao continuar, você concorda com nossos Termos de Serviço e Política de Privacidade
        </p>

        {/* WhatsApp Support Button */}
        <a
          href="https://wa.me/5537991048239"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <MessageCircle className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
          <span>{t('common.auth.whatsappSupport')}</span>
        </a>
      </div>
    </div>
  );
};

export default Auth;
