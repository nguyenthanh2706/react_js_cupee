import React from 'react';

export interface MessageErrorProps {
    error?: string | null;
    className?: string;
}

export function MessageError({ error, className = '' }: MessageErrorProps) {
    if (!error) return null;

    return (
        <small className={`text-red-500 text-xs mt-1 block ${className}`.trim()}>
            {error}
        </small>
    );
}

export default MessageError;
