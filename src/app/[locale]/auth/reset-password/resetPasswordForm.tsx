'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IconField } from '@primereact/ui/iconfield';
import { InputText } from '@primereact/ui/inputtext';
import { InputPassword, InputPasswordValueChangeEvent } from '@primereact/ui/inputpassword';
import { Button } from '@primereact/ui/button';
import { toast } from '@primereact/ui/toaster';
import { useRouter } from '@/i18n/routing';
import { MessageError } from '@/components/common/MessageError';
import { fetchAuth } from '@/api/fetchAuth';
import { useValidation } from '@/utils/validate';

interface ResetPasswordFormState {
    otp: string;
    errOtp: string;
    password: string;
    errPassword: string;
    rePassword: string;
    errRePassword: string;
    [key: string]: string;
}

const FIELD_VALIDATIONS = {
    otp: {
        transitionKey: 'auth.otp',
        types: ['require', 'validOtp'],
        errorKey: 'errOtp'
    },
    password: {
        transitionKey: 'auth.newPassword',
        types: ['require', 'validPass'],
        errorKey: 'errPassword'
    },
    rePassword: {
        transitionKey: 'auth.newPasswordConfirm',
        types: ['require'],
        errorKey: 'errRePassword'
    }
};

export default function ResetPasswordForm() {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { validateOnField, validateOnAllField } = useValidation(t);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordMasked, setIsPasswordMasked] = useState<boolean>(true);
    const [isRePasswordMasked, setIsRePasswordMasked] = useState<boolean>(true);
    const [resetPass, setResetPass] = useState<ResetPasswordFormState>({
        otp: '',
        errOtp: '',
        password: '',
        errPassword: '',
        rePassword: '',
        errRePassword: ''
    });

    const validateRePassword = (state: ResetPasswordFormState): boolean => {
        validateOnField('rePassword', state, state, FIELD_VALIDATIONS);
        if (!state.rePassword) {
            state.errRePassword = t('auth.errorRePass');
            return false;
        }
        if (state.rePassword !== state.password) {
            state.errRePassword = t('auth.rePassNotMatch');
            return false;
        }
        state.errRePassword = '';
        return true;
    };

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const numericOtp = e.target.value.replace(/\D/g, '').slice(0, 6);
        const nextState: ResetPasswordFormState = {
            ...resetPass,
            otp: numericOtp
        };
        validateOnField('otp', nextState, nextState, FIELD_VALIDATIONS);
        setResetPass(nextState);
    };

    const handlePasswordChange = (e: InputPasswordValueChangeEvent): void => {
        const nextState: ResetPasswordFormState = {
            ...resetPass,
            password: e.value ?? ''
        };
        validateOnField('password', nextState, nextState, FIELD_VALIDATIONS);
        setResetPass(nextState);
    };

    const handleRePasswordChange = (e: InputPasswordValueChangeEvent): void => {
        const nextState: ResetPasswordFormState = {
            ...resetPass,
            rePassword: e.value ?? ''
        };
        validateRePassword(nextState);
        setResetPass(nextState);
    };

    const handleResendOtp = async (): Promise<void> => {
        if (isLoading) return;
        const email = searchParams.get('email');
        if (!email) return;

        const { error } = await fetchAuth(t).forgotPassword({ email });
        if (!error) {
            toast.success({
                title: t('text.success'),
                description: t('auth.reSendResetSuccess'),
                group: 'basic'
            });
        }
    };

    const handleResetPassword = async (): Promise<void> => {
        if (isLoading) return;
        const nextState: ResetPasswordFormState = { ...resetPass };
        const isAllFieldsValid = validateOnAllField(nextState, nextState, FIELD_VALIDATIONS);
        const isRePassValid = validateRePassword(nextState);
        setResetPass(nextState);

        if (!isAllFieldsValid || !isRePassValid) return;

        setIsLoading(true);
        const email = searchParams.get('email') || '';
        const { data, error } = await fetchAuth(t).resetPassword({
            email,
            token: nextState.otp.toString(),
            password: nextState.password
        });
        setIsLoading(false);

        if (!error && data) {
            toast.success({
                title: t('text.success'),
                description: t('auth.resetSuccess'),
                group: 'basic'
            });
            router.push('/auth/login');
        } else if (error?.code === 500) {
            const errorMsgKey =
                typeof error.messages === 'object' && !Array.isArray(error.messages) && error.messages?.message
                    ? error.messages.message
                    : error.message;
            if (errorMsgKey) {
                setResetPass((prev) => ({
                    ...prev,
                    errOtp: t(errorMsgKey)
                }));
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleResetPassword();
        }
    };

    return (
        <>
            <div className="title">
                {t('auth.resetPassword')}
                <div className="text-behind">
                    {t('auth.receiveOtp')}{' '}
                    <span
                        className="cursor-pointer text-primary hover:text-[#a38d78]"
                        onClick={handleResendOtp}
                    >
                        {t('auth.retransmission')}
                    </span>
                </div>
            </div>

            <form onKeyDown={handleKeyDown} onSubmit={(e) => e.preventDefault()} className="form-horizontal">
                <div className="input-auth">
                    <label htmlFor="otp" className="title-input">
                        {t('auth.otp')} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start w-96">
                        <IconField.Root className="w-full">
                            <IconField.Inset className="pi pi-android" />
                            <InputText
                                id="otp"
                                value={resetPass.otp}
                                invalid={!!resetPass.errOtp}
                                placeholder="OTP"
                                autoComplete="off"
                                maxLength={6}
                                inputMode="numeric"
                                className="w-full"
                                onChange={handleOtpChange}
                            />
                        </IconField.Root>
                        <div className="whitespace-normal break-words">
                            <MessageError error={resetPass.errOtp} />
                        </div>
                    </div>
                </div>

                <div className="input-auth">
                    <label htmlFor="password" className="title-input">
                        {t('auth.newPassword')} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start w-96">
                        <IconField.Root className="w-full">
                            <IconField.Inset className="pi pi-lock z-20" />
                            <InputPassword
                                id="password"
                                placeholder={t('auth.newPassword')}
                                value={resetPass.password}
                                invalid={!!resetPass.errPassword}
                                mask={isPasswordMasked}
                                autoComplete="new-password"
                                name="new-password-field"
                                className="w-full"
                                onValueChange={handlePasswordChange}
                            />
                            <IconField.Inset
                                className={`pi ${isPasswordMasked ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer z-20`}
                                onClick={() => setIsPasswordMasked((prev) => !prev)}
                            />
                        </IconField.Root>
                        <div className="whitespace-normal break-words">
                            <MessageError error={resetPass.errPassword} />
                        </div>
                    </div>
                </div>

                <div className="input-auth">
                    <label htmlFor="rePassword" className="title-input">
                        {t('auth.newPasswordConfirm')} <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col items-start w-96">
                        <IconField.Root className="w-full">
                            <IconField.Inset className="pi pi-lock z-20" />
                            <InputPassword
                                id="rePassword"
                                placeholder={t('auth.newPasswordConfirm')}
                                value={resetPass.rePassword}
                                invalid={!!resetPass.errRePassword}
                                mask={isRePasswordMasked}
                                autoComplete="new-password"
                                name="new-password-field"
                                className="w-full"
                                onValueChange={handleRePasswordChange}
                            />
                            <IconField.Inset
                                className={`pi ${isRePasswordMasked ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer z-20`}
                                onClick={() => setIsRePasswordMasked((prev) => !prev)}
                            />
                        </IconField.Root>
                        <div className="whitespace-normal break-words">
                            <MessageError error={resetPass.errRePassword} />
                        </div>
                    </div>
                </div>

                <div className="btn-center">
                    <div className="btn-primevue-border">
                        <Button
                            type="button"
                            disabled={isLoading}
                            className="btn-confirm"
                            onClick={handleResetPassword}
                        >
                            {isLoading && <i className="pi pi-spinner pi-spin mr-2" />}
                            <span className="p-button-label">{t('btn.confirm')}</span>
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}
