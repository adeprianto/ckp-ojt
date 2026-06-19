import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { SelectDropdown } from '@/components/select-dropdown';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useOrganizers } from '@/pages/dashboard/master-data/organizers/components/organizers-provider';
import type { Organizer } from '@/types/organizer';

const formSchema = z.object({
    name: z.string().min(1, 'Nama penyelenggara harus diisi.'),
    isPtpnGroup: z.boolean(),
    isEdit: z.boolean(),
});

type OrganizerForm = z.infer<typeof formSchema>;

type OrganizerActionDialogProps = {
    currentRow?: Organizer;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function showSuccessSubmitOrganizerData(
    data: OrganizerForm,
    isEdit = false,
    title: string = 'Sukses',
) {
    toast.success(title, {
        duration: 2000,
        description: (
            // w-[340px]
            <span>
                Penyelenggara {data.name} berhasil{' '}
                {isEdit ? 'diubah' : 'dibuat'}
            </span>
        ),
    });
}

export function OrganizersActionDialog({
    currentRow,
    open,
    onOpenChange,
}: OrganizerActionDialogProps) {
    const { setOrganizers } = useOrganizers();

    const isEdit = !!currentRow;
    const form = useForm<OrganizerForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                  name: currentRow?.name,
                  isPtpnGroup: currentRow?.is_ptpn_group,
                  isEdit,
              }
            : {
                  name: '',
                  isPtpnGroup: undefined,
                  isEdit,
              },
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: OrganizerForm) => {
        if (values.isEdit) {
            setIsLoading(true);
            axios
                .put<Organizer>(
                    `/api/master-data/organizer/${currentRow!.id}`,
                    {
                        name: values.name,
                        is_ptpn_group: values.isPtpnGroup,
                    },
                )
                .then(() => {
                    form.reset();
                    onOpenChange(false);
                    showSuccessSubmitOrganizerData(values, isEdit);

                    return axios.get<Organizer[]>('/api/master-data/organizer');
                })
                .then((response) => {
                    setIsLoading(false);
                    setOrganizers(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);

                    if (axios.isAxiosError(e)) {
                        console.log(e.response?.data);
                        Object.keys(e.response?.data?.errors).forEach((key) => {
                            form.setError(key as keyof OrganizerForm, {
                                type: 'server',
                                message: e.response?.data?.errors[key][0],
                            });
                        });
                    }

                    setIsLoading(false);
                });
        } else {
            setIsLoading(true);
            axios
                .post<Organizer>('/api/master-data/organizer', {
                    name: values.name,
                    is_ptpn_group: values.isPtpnGroup,
                })
                .then(() => {
                    form.reset();
                    onOpenChange(false);
                    showSuccessSubmitOrganizerData(values, isEdit);

                    return axios.get<Organizer[]>('/api/master-data/organizer');
                })
                .then((response) => {
                    setIsLoading(false);
                    setOrganizers(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);

                    if (axios.isAxiosError(e)) {
                        console.log(e.response?.data);
                        Object.keys(e.response?.data?.errors).forEach((key) => {
                            form.setError(key as keyof OrganizerForm, {
                                type: 'server',
                                message: e.response?.data?.errors[key][0],
                            });
                        });
                    }

                    setIsLoading(false);
                });
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                form.reset();
                onOpenChange(state);
            }}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader className="text-start">
                    <DialogTitle>
                        {isEdit
                            ? 'Update penyelenggara'
                            : 'Tambah penyelenggara baru'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? 'Update penyelenggara '
                            : 'Tambah penyelenggara baru '}
                        Klik tombol simpan saat anda sudah selesai.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3">
                    <Form {...form}>
                        <form
                            id="user-form"
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 px-0.5"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Nama
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan nama"
                                                className="col-span-4"
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isPtpnGroup"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Termasuk Dalam PTPN Grup
                                        </FormLabel>
                                        <SelectDropdown
                                            defaultValue={field.value?.toString()}
                                            onValueChange={(value) =>
                                                form.setValue(
                                                    'isPtpnGroup',
                                                    value === '1',
                                                )
                                            }
                                            placeholder="Termasuk dalam PTPN Group"
                                            className="col-span-4 w-full overflow-hidden"
                                            items={[
                                                {
                                                    label: 'LPP',
                                                    value: '1',
                                                },
                                                {
                                                    label: 'Non LPP',
                                                    value: '0',
                                                },
                                            ]}
                                        />
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
                <DialogFooter>
                    <Button disabled={isLoading} type="submit" form="user-form">
                        {isLoading && <Spinner />} Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
