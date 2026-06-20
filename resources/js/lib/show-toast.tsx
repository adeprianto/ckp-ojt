import { toast } from 'sonner';

export function showToast(
    data: unknown,
    title: string = 'You submitted the following values:',
) {
    toast.message(title, {
        description: (
            // w-[340px]
            <pre className="mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4">
                <code className="text-white">
                    {JSON.stringify(data, null, 2)}
                </code>
            </pre>
        ),
    });
}

type LoadingToastType = {
    loadingInfo?: string;
    toastId?: number | string;
};

export function showLoadingToast(param?: LoadingToastType) {
    return toast.loading(
        <div>{param?.loadingInfo ? param?.loadingInfo : 'Loading ...'}</div>,
        {
            id: param?.toastId,
        },
    );
}

type SuccessToastType = {
    successInfo?: string;
    toastId?: number | string;
};

export function showSuccessToast(param?: SuccessToastType) {
    return toast.success(
        <div>{param?.successInfo ? param?.successInfo : 'Berhasil'}</div>,
        {
            id: param?.toastId,
        },
    );
}

type ErrorToastType = {
    errorInfo?: string;
    toastId?: number | string;
};

export function showErrorToast(param: ErrorToastType) {
    return toast.error(
        <div>{param?.errorInfo ? param?.errorInfo : 'Gagal'}</div>,
        {
            id: param?.toastId,
        },
    );
}
