export function useValidation(t: (key: string, params?: any) => string) {
    const convertToHalfsize = (chars: string): string => {
        let halfwidth = '';
        for (let i = 0; i < chars.length; i++) {
            let charCode = chars.charCodeAt(i);
            if (charCode === 12290) charCode = 46;
            if (charCode >= 0xff00 && charCode <= 0xffef) {
                charCode = 0xff & (charCode + 0x20);
            }
            halfwidth += String.fromCharCode(charCode);
        }
        return formatNumber(halfwidth);
    };

    const formatNumber = (number: string | null): string => (number !== null ? number.replace(/,/g, '') : '');

    const validMaxLength = (value: string, length = 255): boolean => value?.length <= length;
    const validMinLength = (value: string, length = 0): boolean => value?.length >= length;
    const validCalendarRange = (value: [any, any]): boolean => !!(value?.[0] && value?.[1]);
    const validCode = (code: string): boolean => /^[a-zA-Z0-9_\-\u3040-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]+$/.test(code);
    const validEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const validPostCodeJapan = (value: string): boolean => /^\d{3}-\d{4}$/.test(convertToHalfsize(value));
    const validPass = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,20}$/.test(password);
    const validNumberOtp = (number: string): boolean => /^\d{6,}$/.test(number);
    const validTextPhoneAndFax = (value: string): boolean => /^[0-9-+]+$/.test(convertToHalfsize(value));
    const validateTextHira = (value: string): boolean => /^[ぁ-んァ-ヶｦ-ﾟー 　]+$/.test(value);
    const validateTextHasSpace = (value: string): boolean => !/[ 　]/.test(value);
    const validatePasswordRegex = (value: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(value);
    const validateTax = (value: string): boolean => /^[0-9]{10,13}$/.test(String(value).trim());

    interface ValidateResult {
        check: boolean;
        errorInfo: string;
    }

    const validate = (value: any, translationKey: string, type: string[]): ValidateResult => {
        let check = true;
        let errorValue = '';

        if (check && type.includes('require') && !value?.toString().trim() && value !== 0) {
            errorValue = t('text.notEmptyInput', { field: t(translationKey) });
            check = false;
        }

        if (check && type.includes('emptySelect') && (!value || value.length === 0)) {
            errorValue = t('text.notEmptyChoose', { field: t(translationKey) });
            check = false;
        }

        const rulesMap: Record<string, () => boolean> = {
            calendarRange: () => validCalendarRange(value),
            max9: () => validMaxLength(value, 9),
            max20: () => validMaxLength(value, 20),
            min8: () => validMinLength(value, 8),
            max50: () => validMaxLength(value, 50),
            max255: () => validMaxLength(value, 255),
            max2000: () => validMaxLength(value, 2000),
            validCode: () => validCode(value),
            validEmail: () => validEmail(value),
            validOtp: () => validNumberOtp(value),
            validPass: () => validPass(value),
            validZipCode: () => validPostCodeJapan(value),
            min0Valid: () => Number(value) > 0,
            vaildHiragana: () => validateTextHira(value),
            validateSpacing: () => validateTextHasSpace(value),
            validTax: () => validateTax(value),
            passwordRegex: () => validatePasswordRegex(value)
        };

        for (const typeKey of type) {
            if (check && rulesMap[typeKey] && !rulesMap[typeKey]()) {
                errorValue = t(`text.${typeKey}`, { field: t(translationKey) });
                check = false;
            }
        }

        return { check, errorInfo: errorValue };
    };

    const onValidatePasteFax = (event: ClipboardEvent): void => {
        const text = event.clipboardData?.getData('text') ?? '';
        if (!validTextPhoneAndFax(text) || text.length >= 20) {
            event.preventDefault();
        }
    };

    const onValidateKeyPressFax = (event: KeyboardEvent): void => {
        const input = event.target as HTMLInputElement;
        if (!/^\d$/.test(event.key) || input.value.length >= 20) {
            event.preventDefault();
        }
    };

    type FieldValidateConfig = {
        transitionKey: string;
        types: string[];
        errorKey: string;
    };

    type FieldValidate = Record<string, FieldValidateConfig>;

    const validateOnField = (field: string, objectData: Record<string, any>, objectError: Record<string, any>, fieldValidate: FieldValidate): boolean => {
        let check = true;
        for (const [fieldCheck, config] of Object.entries(fieldValidate)) {
            if (field && field !== fieldCheck) continue;
            const { transitionKey, types, errorKey } = config;
            const result = validate(objectData[fieldCheck], transitionKey, types);
            check = check && result.check;
            objectError[errorKey] = result.errorInfo;
        }
        return check;
    };

    const validateOnAllField = (objectData: Record<string, any>, objectError: Record<string, any>, fieldValidate: FieldValidate): boolean => {
        let check = true;
        for (const [field, config] of Object.entries(fieldValidate)) {
            const { transitionKey, types, errorKey } = config;
            const result = validate(objectData[field], transitionKey, types);
            check = check && result.check;
            objectError[errorKey] = result.errorInfo;
        }
        return check;
    };

    return {
        convertToHalfsize,
        formatNumber,
        validMaxLength,
        validMinLength,
        validCalendarRange,
        validCode,
        validEmail,
        validPostCodeJapan,
        validPass,
        validNumberOtp,
        validTextPhoneAndFax,
        validateTextHira,
        validateTextHasSpace,
        validatePasswordRegex,
        validateTax,
        validate,
        onValidatePasteFax,
        onValidateKeyPressFax,
        validateOnField,
        validateOnAllField
    };
}
