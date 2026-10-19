'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { IconField } from '@primereact/ui/iconfield';
import { InputText } from '@primereact/ui/inputtext';
import { Button } from '@primereact/ui/button';
import { toast } from '@primereact/ui/toaster';
import { useRouter } from '@/i18n/routing';
import { MessageError } from '@/components/common/MessageError';
import { fetchAuth, ApiErrorResponse } from '@/api/fetchAuth';
import { useValidation } from '@/utils/validate';

interface ForgotPasswordFormState {
    email: string;
    errorEmail: string;
    [key: string]: string;
}

const FIELD_VALIDATIONS = {
    email: { transitionKey: 'auth.email', types: ['require', 'validEmail'], errorKey: 'errorEmail' }
};

export default function ForgotPasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const { validateOnField, validateOnAllField } = useValidation(t);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [forgotPass, setForgotPass] = useState<ForgotPasswordFormState>({
        email: '',
        errorEmail: ''
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
        const nextState: ForgotPasswordFormState = {
            ...forgotPass,
            email: e.target.value.trim()
        };
        validateOnField('email', nextState, nextState, FIELD_VALIDATIONS);
        setForgotPass(nextState);
    };

    const handleForgotPassword = async (): Promise<void> => {
        if (isLoading) return;
        const nextState: ForgotPasswordFormState = { ...forgotPass };
        const isValidate = validateOnAllField(nextState, nextState, FIELD_VALIDATIONS);
        setForgotPass(nextState);
        if (!isValidate) return;

        setIsLoading(true);
        const { error } = await fetchAuth(t).forgotPassword({
            email: nextState.email
        });
        setIsLoading(false);

        if (error) {
            showMessageError(error);
            return;
        }

        toast.success({
            title: t('text.success'),
            description: t('auth.sendResetSuccess'),
            group: 'basic'
        });
        router.push(`/auth/reset-password?email=${encodeURIComponent(nextState.email)}`);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleForgotPassword();
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
                            value={forgotPass.email}
                            type="text"
                            invalid={!!forgotPass.errorEmail}
                            className="w-full"
                            placeholder="example@gmail.com"
                            onChange={handleEmailChange}
                        />
                    </IconField.Root>
                    <div className="whitespace-normal break-words">
                        <MessageError error={forgotPass.errorEmail} />
                    </div>
                </div>
            </div>

            <div className="btn-center">
                <div className="btn-primevue-border">
                    <Button
                        type="button"
                        variant="outlined"
                        className="btn-back"
                        onClick={() => router.push('/auth/login')}
                    >
                        <span className="p-button-label">{t('btn.back')}</span>
                    </Button>
                    <Button
                        type="button"
                        disabled={isLoading}
                        className="btn-confirm"
                        onClick={handleForgotPassword}
                    >
                        {isLoading && <i className="pi pi-spinner pi-spin mr-2" />}
                        <span className="p-button-label">{t('btn.confirm')}</span>
                    </Button>
                </div>
            </div>
        </form>
    );
}
