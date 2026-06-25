import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
import { showErrorToast } from '@/lib/show-toast';
import { useTraining } from '@/pages/dashboard/master-data/trainings/components/training-provider';
import type { Organizer } from '@/types/organizer';
import type { Training } from '@/types/training';

const formSchema = z.object({
    name: z.string().min(1, 'Nama pelatihan harus diisi.'),
    activity_type: z.string().min(1, 'Jenis kegiatan pelatihan harus diisi.'),
    learning_sector: z.string().min(1, 'Bidang pelatihan harus diisi.'),
    learning_type: z.string().min(1, 'Bentuk pelatihan harus diisi.'),
    learning_hours: z.number().nullable(),
    cost: z.bigint().nullable(),
    organization_id: z.int().nullable(),
    is_ptpn_group: z.boolean().nullable(),
    isEdit: z.boolean(),
});

type TrainingForm = z.infer<typeof formSchema>;

type TrainingActionDialogProps = {
    currentRow?: Training;
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

function showSuccessSubmitTrainingData(
    data: TrainingForm,
    isEdit = false,
    title: string = 'Sukses',
) {
    toast.success(title, {
        duration: 2000,
        description: (
            // w-[340px]
            <span>
                Pelatihan {data.name} berhasil {isEdit ? 'diubah' : 'dibuat'}
            </span>
        ),
    });
}

export function TrainingActionDialog({
    currentRow,
    open,
    onOpenChange,
}: TrainingActionDialogProps) {
    const [isLoadingOrganizers, setIsLoadingOrganizers] = useState(false);
    const [organizers, setOrganizers] = useState<Organizer[]>([]);

    useEffect(() => {
        const fetchOrganizers = async () => {
            setIsLoadingOrganizers(true);

            try {
                const response = await axios.get<Organizer[]>(
                    '/api/master-data/organizer',
                );
                setOrganizers(response.data);
                setIsLoadingOrganizers(false);
            } catch (error) {
                console.log(error);
                setIsLoadingOrganizers(false);
                showErrorToast({
                    errorInfo: 'Gagal mengambil data penyelenggara pelatihan',
                });
            }
        };

        fetchOrganizers();
    }, []);

    const { setTrainings } = useTraining();

    const isEdit = !!currentRow;
    const form = useForm<TrainingForm>({
        resolver: zodResolver(formSchema),
        defaultValues: isEdit
            ? {
                  name: currentRow?.name,
                  activity_type: currentRow?.activity_type,
                  learning_sector: currentRow?.learning_sector,
                  learning_type: currentRow?.learning_type,
                  learning_hours: currentRow?.learning_hours,
                  cost: currentRow?.cost ? BigInt(currentRow?.cost) : 0n,
                  organization_id: currentRow?.organization_id,
                  is_ptpn_group: currentRow?.is_ptpn_group
                      ? Boolean(currentRow?.is_ptpn_group)
                      : null,
                  isEdit,
              }
            : {
                  // CHANGE ALL OF THESE FROM undefined
                  name: '',
                  activity_type: '',
                  learning_sector: '',
                  learning_type: '',
                  learning_hours: null,
                  cost: null,
                  organization_id: null,
                  is_ptpn_group: null,
                  isEdit,
              },
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (values: TrainingForm) => {
        if (values.isEdit) {
            setIsLoading(true);
            axios
                .put<Organizer>(`/api/master-data/training/${currentRow!.id}`, {
                    name: values.name,
                    activity_type: values.activity_type,
                    learning_sector: values.learning_sector,
                    learning_type: values.learning_type,
                    learning_hours: values.learning_hours,
                    cost: values.cost?.toString(),
                    organization_id: values.organization_id,
                    is_ptpn_group: values.is_ptpn_group ?? null,
                })
                .then(() => {
                    form.reset();
                    onOpenChange(false);
                    showSuccessSubmitTrainingData(values, isEdit);

                    return axios.get<Training[]>('/api/master-data/training');
                })
                .then((response) => {
                    setIsLoading(false);
                    setTrainings(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);

                    if (axios.isAxiosError(e)) {
                        console.log(e.response?.data);
                        Object.keys(e.response?.data?.errors).forEach((key) => {
                            form.setError(key as keyof TrainingForm, {
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
                .post<Organizer>('/api/master-data/training', {
                    name: values.name,
                    activity_type: values.activity_type,
                    learning_sector: values.learning_sector,
                    learning_type: values.learning_type,
                    learning_hours: values.learning_hours,
                    cost: values.cost?.toString(),
                    organization_id: values.organization_id,
                    is_ptpn_group: values.is_ptpn_group ?? null,
                })
                .then(() => {
                    form.reset();
                    onOpenChange(false);
                    showSuccessSubmitTrainingData(values, isEdit);

                    return axios.get<Training[]>('/api/master-data/training');
                })
                .then((response) => {
                    setIsLoading(false);
                    setTrainings(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);

                    if (axios.isAxiosError(e)) {
                        console.log(e.response?.data);
                        Object.keys(e.response?.data?.errors).forEach((key) => {
                            form.setError(key as keyof TrainingForm, {
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
                                                {...field}
                                                value={field.value ?? ''}
                                                placeholder="Masukkan nama"
                                                className="col-span-4"
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="activity_type"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Kegiatan Pelatihan
                                        </FormLabel>
                                        <SelectDropdown
                                            defaultValue={
                                                field.value?.toString() ?? ''
                                            }
                                            onValueChange={field.onChange}
                                            placeholder="Pilih Kegiatan Pelatihan"
                                            className="col-span-4 w-full overflow-hidden"
                                            items={[
                                                {
                                                    label: 'Pelatihan',
                                                    value: 'pelatihan',
                                                },
                                                {
                                                    label: 'Workshop',
                                                    value: 'workshop',
                                                },
                                                {
                                                    label: 'Webinar',
                                                    value: 'webinar',
                                                },
                                                {
                                                    label: 'Sertifikasi',
                                                    value: 'sertifikasi',
                                                },
                                                {
                                                    label: 'Kursus Jabatan',
                                                    value: 'kursus_jabatan',
                                                },
                                            ]}
                                        />
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="learning_sector"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Bidang
                                        </FormLabel>
                                        <SelectDropdown
                                            defaultValue={
                                                field.value?.toString() ?? ''
                                            }
                                            onValueChange={field.onChange}
                                            placeholder="Bidang Pelatihan"
                                            className="col-span-4 w-full overflow-hidden"
                                            items={[
                                                {
                                                    label: 'Tanaman',
                                                    value: 'tanaman',
                                                },
                                                {
                                                    label: 'Teknik',
                                                    value: 'teknik',
                                                },
                                                {
                                                    label: 'Pengolahan',
                                                    value: 'pengolahan',
                                                },
                                                {
                                                    label: 'Keuangan',
                                                    value: 'keuangan',
                                                },
                                                {
                                                    label: 'Personalia',
                                                    value: 'personalia',
                                                },
                                                {
                                                    label: 'Umum',
                                                    value: 'umum',
                                                },
                                            ]}
                                        />
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="learning_type"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Jenis Pelatihan
                                        </FormLabel>
                                        <SelectDropdown
                                            defaultValue={
                                                field.value?.toString() ?? ''
                                            }
                                            onValueChange={field.onChange}
                                            placeholder="Pilih Jenis Pelatihan"
                                            className="col-span-4 w-full overflow-hidden"
                                            items={[
                                                {
                                                    label: 'Softskill',
                                                    value: 'softskill',
                                                },
                                                {
                                                    label: 'Hardskill',
                                                    value: 'hardskill',
                                                },
                                            ]}
                                        />
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="organization_id"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Penyelenggara
                                        </FormLabel>
                                        <SelectDropdown
                                            isControlled
                                            defaultValue={
                                                field.value?.toString() ?? ''
                                            }
                                            onValueChange={(value) => {
                                                field.onChange(parseInt(value));

                                                const selectedOrg =
                                                    organizers.find(
                                                        (org) =>
                                                            org.id.toString() ===
                                                            value,
                                                    );

                                                form.setValue(
                                                    'is_ptpn_group',
                                                    Boolean(
                                                        selectedOrg?.is_ptpn_group ??
                                                        null,
                                                    ),
                                                    {
                                                        shouldValidate: true,
                                                        shouldDirty: true,
                                                    },
                                                );
                                            }}
                                            placeholder="Pilih Penyelenggara"
                                            className="col-span-4 w-full overflow-hidden"
                                            isPending={isLoadingOrganizers}
                                            items={organizers.map((org) => ({
                                                label: org.name,
                                                value: org.id.toString(),
                                            }))}
                                        />
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="is_ptpn_group"
                                render={({ field }) => {
                                    const dropdownValue =
                                        field.value === true
                                            ? '1'
                                            : field.value === false
                                              ? '0'
                                              : undefined;

                                    return (
                                        <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                            <FormLabel className="col-span-2">
                                                Termasuk Dalam PTPN Grup
                                            </FormLabel>
                                            <SelectDropdown
                                                isControlled
                                                defaultValue={dropdownValue}
                                                onValueChange={(value) =>
                                                    field.onChange(
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
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="learning_hours"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Jam Pembelajaran
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value?.toString()}
                                                placeholder="Masukkan jam pembelajaran"
                                                className="col-span-4"
                                                autoComplete="off"
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className="col-span-4 col-start-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cost"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1">
                                        <FormLabel className="col-span-2">
                                            Biaya Pelatihan
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value?.toString()}
                                                placeholder="Masukkan biaya pelatihan"
                                                className="col-span-4"
                                                autoComplete="off"
                                                type="number"
                                                onChange={(e) =>
                                                    field.onChange(
                                                        BigInt(e.target.value),
                                                    )
                                                }
                                            />
                                        </FormControl>
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
