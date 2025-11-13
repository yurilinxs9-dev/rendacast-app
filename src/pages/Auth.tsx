import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Check } from 'lucide-react';
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
            {t('auth.title')}
          </h1>
          <p className="text-muted-foreground">
            {isLogin ? t('auth.login.subtitle') : t('auth.signup.subtitle')}
          </p>
        </div>

        <div className="card-shine p-8 rounded-2xl border border-border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t('auth.fields.name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('auth.fields.namePlaceholder')}
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
                {t('auth.fields.email')}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={t('auth.fields.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {t('auth.fields.password')}
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.fields.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="bg-background/50"
              />
              {!isLogin && (
                <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-xs font-medium text-foreground mb-2">
                    {t('auth.passwordRequirements.title')}
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {t('auth.passwordRequirements.minLength')}
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {t('auth.passwordRequirements.lowercase')}
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {t('auth.passwordRequirements.uppercase')}
                    </li>
                    <li className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Check className="w-3 h-3 text-primary" />
                      {t('auth.passwordRequirements.number')}
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full gradient-hero border-0 glow-effect h-12"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t('auth.loading')
                : isLogin
                ? t('auth.login.button')
                : t('auth.signup.button')}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? t('auth.toggle.noAccount') : t('auth.toggle.hasAccount')}
              <span className="text-primary font-semibold">
                {isLogin ? t('auth.toggle.createAccount') : t('auth.toggle.login')}
              </span>
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          {t('auth.terms')}
        </p>
      </div>
    </div>
  );
};

export default Auth;
