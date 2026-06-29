import { LoginForm } from '@/pages/auth/login-form';

export default function Login() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <div className="flex flex-1 items-end justify-between">
                        <img
                            src="/assets/images/danantara.png"
                            alt="ptpn1"
                            className="w-26"
                        />
                        <div className="flex items-end gap-4">
                            <img
                                src="/assets/images/ptpn1.png"
                                alt="ptpn1"
                                className="w-9"
                            />
                            <img
                                src="/assets/images/ptpn3.png"
                                alt="ptpn1"
                                className="w-16"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:flex lg:items-center lg:justify-center lg:p-20">
                <div className="relative rounded-lg bg-white p-8">
                    <img
                        src="/assets/images/agrow-track-1.svg"
                        alt="Image"
                        className="inset-0 object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>
        </div>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
