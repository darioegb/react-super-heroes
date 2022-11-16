import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SnackbarProvider } from 'notistack';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import { FormImgUpload } from '.';

export default {
  title: 'Components/Form/FormImgUpload',
  argTypes: {
    ref: {
      description: 'Is a component ref',
      control: false,
      type: {
        required: true,
      } as unknown,
    },
    register: {
      control: false,
    },
    error: {
      control: false,
    },
  },
  args: {
    view: false,
    previewCardTitle: 'Preview',
    imageErrorMessage: 'Image upload failed',
    seletedItemPicture: '',
  },
  component: FormImgUpload,
  decorators: [
    (Story) => <SnackbarProvider maxSnack={3}>{Story()}</SnackbarProvider>,
  ],
  parameters: {
    docs: {
      source: {
        code: `
        // Add this line to initUpload process on parent method
        imgUploadRef?.current?.initUploading();

        <FormImgUpload
            name="picture"
            register={register}
            seletedItemPicture={item?.picture}
            error={errors?.picture}
            view={view}
            onSave={handleSave}
            ref={imgUploadRef}
        />`,
      },
    },
  },
} as ComponentMeta<typeof FormImgUpload>;

const Template: ComponentStory<typeof FormImgUpload> = (args) => {
  const { t: translate } = useTranslation();
  const schema = useMemo(
    () =>
      yup.object().shape({
        [args.name]: yup
          .mixed()
          .test(
            'fileSize',
            translate('validations.fileSize'),
            (value) => !value.length || value[0].size <= 200000,
          ),
      }),
    [args.name, translate],
  );
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <FormImgUpload {...args} register={register} error={errors?.[args.name]} />
  );
};

export const Default = Template.bind({});

Default.args = {
  name: 'picture',
};
