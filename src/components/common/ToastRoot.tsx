'use client';

import { Check } from '@primeicons/react/check';
import { ExclamationTriangle } from '@primeicons/react/exclamation-triangle';
import { InfoCircle } from '@primeicons/react/info-circle';
import { Times } from '@primeicons/react/times';
import { Button } from '@primereact/ui/button';
import { Toast } from '@primereact/ui/toast';
import { Toaster } from '@primereact/ui/toaster';
import { ToasterRegionInstance, ToastType } from '@primereact/ui/toaster';

function ToastRoot() {
    return (
        <Toaster.Root group="basic">
            <Toaster.Portal>
                <Toaster.Region>
                    {({ toaster }: ToasterRegionInstance) =>
                        toaster?.toasts.map((toast: ToastType) => (
                            <Toast.Root key={toast.id} toast={toast}>
                                <Toast.Content>
                                    <Toast.Icon match="success">
                                        <Check />
                                    </Toast.Icon>
                                    <Toast.Icon match="error">
                                        <Times />
                                    </Toast.Icon>
                                    <Toast.Icon match="warn">
                                        <ExclamationTriangle />
                                    </Toast.Icon>
                                    <Toast.Icon match="info">
                                        <InfoCircle />
                                    </Toast.Icon>
                                    <Toast.Message>
                                        <Toast.Title />
                                        <Toast.Description />
                                        <Toast.Action as={Button} size="small" className="mt-3" />
                                    </Toast.Message>
                                    <Toast.Close>
                                        <Times />
                                    </Toast.Close>
                                </Toast.Content>
                            </Toast.Root>
                        ))
                    }
                </Toaster.Region>
            </Toaster.Portal>
        </Toaster.Root>
    );
}
export default ToastRoot;
