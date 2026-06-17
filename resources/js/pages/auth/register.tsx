import { Head, useForm } from '@inertiajs/react'; // Removed 'Form'
import type { SubmitEventHandler } from 'react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        remember: false,
    });

    const onRegister: SubmitEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        post('/api/auth/register', {
            onSuccess: () => {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <>
            <Head title="Register" />
            <form onSubmit={onRegister} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            value={data.username}
                            onChange={(e) =>
                                setData('username', e.target.value)
                            }
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            name="username"
                            placeholder="Username"
                            disabled={processing} // Disable while processing
                        />
                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            tabIndex={2}
                            autoComplete="email"
                            name="email"
                            placeholder="email@example.com"
                            disabled={processing}
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            name="password"
                            placeholder="Password"
                            disabled={processing}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirm password
                        </Label>
                        <PasswordInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            name="password_confirmation"
                            placeholder="Confirm password"
                            disabled={processing}
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        tabIndex={5}
                        data-test="register-user-button"
                        disabled={processing}
                    >
                        {processing && <Spinner />}
                        Create account
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={login()} tabIndex={6}>
                        Log in
                    </TextLink>
                </div>
            </form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
