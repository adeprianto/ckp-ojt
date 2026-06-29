import { Form } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { store } from '@/routes/login';

export function LoginForm({ className }: React.ComponentProps<'form'>) {
    return (
        <Form
            {...store()}
            className={cn('flex flex-col gap-6', className)}
            resetOnSuccess={['password']}
        >
            {({ processing, errors }) => (
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="mt-8 text-2xl font-bold">
                            Login to your account
                        </h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                    <Field>
                        <FieldLabel htmlFor="username">Email</FieldLabel>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                        />
                        <InputError message={errors.username} />
                    </Field>
                    <Field>
                        <div className="flex items-center">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <a
                                href="#"
                                className="ml-auto text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </a>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                        />
                        <InputError message={errors.password} />
                    </Field>
                    <Field>
                        <Button
                            type="submit"
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner />}
                            Login
                        </Button>
                    </Field>
                </FieldGroup>
            )}
        </Form>
    );
}
