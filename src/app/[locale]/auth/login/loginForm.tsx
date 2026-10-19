'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IconField } from '@primereact/ui/iconfield';
import { InputText } from '@primereact/ui/inputtext';
import { InputPassword, InputPasswordValueChangeEvent } from '@primereact/ui/inputpassword';
import { Button } from '@primereact/ui/button';
import { toast } from '@primereact/ui/toaster';
import { Link, useRouter } from '@/i18n/routing';
import { MessageError } from '@/components/common/MessageError';
import { fetchAuth, ApiErrorResponse } from '@/api/fetchAuth';
import { useAuthStore } from '@/stores/authStore';
import { useValidation } from '@/utils/validate';

interface AuthFormState {
    email: string;
    errorEmail: string;
    password: string;
    errorPassword: string;
    [key: string]: string;
}

const FIELD_VALIDATIONS = {
    email: { transitionKey: 'auth.email', types: ['require', 'validEmail'], errorKey: 'errorEmail' },
    password: { transitionKey: 'auth.password', types: ['require', 'validPass'], errorKey: 'errorPassword' }
};

export default function LoginForm() {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const loginStore = useAuthStore((state) => state.login);
    const { validateOnField, validateOnAllField } = useValidation(t);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordMasked, setIsPasswordMasked] = useState<boolean>(true);
    const [auth, setAuth] = useState<AuthFormState>({
        email: '',
        errorEmail: '',
        password: '',
        errorPassword: ''
    });

    const showMessageError = (error: ApiErrorResponse | null): void => {
        if (error?.code !== 422) return;
        if (!Array.isArray(error?.messages)) return;
        error.messages.forEach((msg: string) => {
            toast.error({
                title: t('text.error'),
                description: t(msg),
                group: 'basic'
            });
        });
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const nextAuth: AuthFormState = {
            ...auth,
            email: e.target.value.trim()
        };
        validateOnField('email', nextAuth, nextAuth, FIELD_VALIDATIONS);
        setAuth(nextAuth);
    };

    const handlePasswordChange = (e: InputPasswordValueChangeEvent): void => {
        const nextAuth: AuthFormState = {
            ...auth,
            password: e.value ?? ''
        };
        validateOnField('password', nextAuth, nextAuth, FIELD_VALIDATIONS);
        setAuth(nextAuth);
    };

    const handleLogin = async (): Promise<void> => {
        if (isLoading) return;
        const nextAuth: AuthFormState = { ...auth };
        const isValidate = validateOnAllField(nextAuth, nextAuth, FIELD_VALIDATIONS);
        setAuth(nextAuth);
        if (!isValidate) return;

        setIsLoading(true);
        const { data, error } = await fetchAuth(t).login({
            email: nextAuth.email,
            password: nextAuth.password
        });
        setIsLoading(false);

        if (error) {
            showMessageError(error);
            return;
        }

        if (data) {
            const d = new Date();
            d.setUTCHours(23, 59, 59, 999);
            if (data.access_token) {
                loginStore(data.access_token, d, data.user ?? null);
            } else if (data.user && typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(data.user));
            }
            toast.success({
                title: t('text.success'),
                description: t('auth.loginSuccess'),
                group: 'basic'
            });
            const redirectPath = searchParams.get('redirect') || '/introduce/company-info';
            router.push(redirectPath);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
    };

    return (
        <form onKeyDown={handleKeyDown} onSubmit={(e) => e.preventDefault()} className="form-horizontal">
            <div className="input-auth">
                <label htmlFor="email" className="title-input">
                    {t('auth.email')} <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-start w-96">
                    <IconField.Root className="w-full">
                        <IconField.Inset className="pi pi-envelope" />
                        <InputText
                            id="email"
                            value={auth.email}
                            invalid={!!auth.errorEmail}
                            type="text"
                            className="w-full"
                            placeholder="example@gmail.com"
                            onChange={handleEmailChange}
                        />
                    </IconField.Root>
                    <div className="whitespace-normal break-words">
                        <MessageError error={auth.errorEmail} />
                    </div>
                </div>
            </div>

            <div className="input-auth">
                <label htmlFor="password" className="title-input">
                    {t('auth.password')} <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-start w-96">
                    <IconField.Root className="w-full">
                        <IconField.Inset className="pi pi-lock z-20" />
                        <InputPassword
                            id="password"
                            value={auth.password}
                            invalid={!!auth.errorPassword}
                            mask={isPasswordMasked}
                            className="w-full"
                            placeholder="********"
                            onValueChange={handlePasswordChange}
                        />
                        <IconField.Inset
                            className={`pi ${isPasswordMasked ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer z-20`}
                            onClick={() => setIsPasswordMasked((prev) => !prev)}
                        />
                    </IconField.Root>
                    <div className="whitespace-normal break-words">
                        <MessageError error={auth.errorPassword} />
                    </div>
                </div>
            </div>

            <div className="input-auth">
                <div className="btn-primevue-group">
                    <Button
                        type="button"
                        disabled={isLoading}
                        className="btn btn-solid w-96 mt-6"
                        onClick={handleLogin}
                    >
                        {isLoading && <i className="pi pi-spinner pi-spin mr-2" />}
                        <span className="p-button-label">{t('auth.login')}</span>
                    </Button>
                </div>
            </div>

            <div className="input-auth text">
                <div className="translate-x-[100%]">
                    {t('auth.forgotPassword')} ?{' '}
                    <Link href="/auth/forgot-password" className="text-[#002bff] hover:text-[#a38d78]">
                        {t('auth.getPassword')}
                    </Link>
                </div>
            </div>

            <div className="input-auth text">
                <div className="translate-x-[100%]">
                    {t('auth.notRegistered')} ?{' '}
                    <Link href="/register" className="text-[#002bff] hover:text-[#a38d78]">
                        {t('auth.registerNow')}
                    </Link>
                </div>
            </div>
        </form>
    );
}
