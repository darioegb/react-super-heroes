import { useState, useMemo, useRef } from 'react';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Option } from 'interfaces';
import { convertEnumToKeyValueArray } from 'utils';
import {
  GenreEnum,
  HTTP_METHOD_KEYS,
  REG_EXP,
  DEFAULT_FORM_CONTROL_SIZES,
} from 'constant';
import {
  SuperHero,
  SuperHeroForm,
} from 'modules/super-hero/interfaces/superHero';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import {
  FormCard,
  SelectController,
  TextfieldController,
  FormImgUpload,
  FormImgUploadExpose,
  FormCardActions,
} from 'components';

const { text, number, textarea } = DEFAULT_FORM_CONTROL_SIZES;

export const SuperHeroDetailPage = () => {
  const { t: translate } = useTranslation();
  const history = useHistory();
  const { selectedSuperHero, saveOrUpdate } = useSuperHero();
  const [superHero, setSuperHero] = useState<SuperHero>();
  const imgUploadRef = useRef<FormImgUploadExpose>(null);
  const schema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .matches(REG_EXP.alphabet)
          .min(text.min)
          .max(text.max)
          .required(),
        genre: yup
          .mixed()
          .oneOf(Object.values(GenreEnum), translate('validations.required'))
          .required(),
        specialty: yup.string().min(textarea.min).max(textarea.max).required(),
        age: yup
          .number()
          .positive()
          .integer()
          .min(number.min)
          .transform((value) => (isNaN(value) ? undefined : value)),
        height: yup
          .number()
          .positive()
          .min(number.min)
          .transform((value) => (isNaN(value) ? undefined : value)),
        weight: yup
          .number()
          .positive()
          .min(number.min)
          .transform((value) => (isNaN(value) ? undefined : value)),
        picture: yup
          .mixed()
          .test(
            'fileSize',
            translate('validations.fileSize'),
            (value) => !value.length || value[0].size <= 200000,
          ),
      }),
    [translate],
  );
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const view = (history.location.state as { view: boolean })?.view;
  const { id } = useParams<{ id: string }>();
  const genres: Option[] = convertEnumToKeyValueArray(GenreEnum);

  const onSubmit = async (value: unknown) => {
    const { name, genre, specialty, age, height, weight, picture } =
      value as SuperHeroForm;
    setSuperHero({ name, genre, specialty, age, height, weight });
    if (picture?.length) {
      imgUploadRef?.current?.initUploading();
    } else {
      handleSave();
    }
  };

  const handleSave = async (downloadURL?: string) => {
    const opType = selectedSuperHero
      ? HTTP_METHOD_KEYS.put
      : HTTP_METHOD_KEYS.post;
    await saveOrUpdate(
      opType,
      {
        ...(superHero as SuperHero),
        ...(downloadURL && { picture: downloadURL }),
      },
      selectedSuperHero,
    );
    handleReturn();
  };

  const onReset = () => reset();

  const handleReturn = () => history.goBack();

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
      <FormCard
        title={translate('superHeroes.detail.title')}
        actions={
          <FormCardActions
            isEditOrView={!!id}
            view={view}
            cancelButtonText={translate('globals.buttons.cancel')}
            resetButtonText={translate('globals.buttons.reset')}
            saveButtonText={translate('globals.buttons.save')}
          />
        }
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextfieldController
              name="name"
              control={control}
              defaultValue={selectedSuperHero?.name}
              label={translate('superHeroes.grid.columns.name')}
              placeholder={translate('superHeroes.detail.form.namePlaceholder')}
              variant="filled"
              error={errors?.name}
              disabled={view}
              uppercase={true}
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldController
              name="age"
              control={control}
              defaultValue={selectedSuperHero?.age}
              label={translate('superHeroes.grid.columns.age')}
              placeholder={translate('superHeroes.detail.form.agePlaceholder')}
              variant="filled"
              type="number"
              error={errors?.age}
              disabled={view}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectController
              name="genre"
              control={control}
              defaultValue={selectedSuperHero?.genre}
              defaultSelectLabel={translate('globals.selectDefault')}
              label={translate('superHeroes.grid.columns.genre')}
              placeholder={translate(
                'superHeroes.detail.form.genrePlaceHolder',
              )}
              options={genres}
              optionLabelPath="globals.enums.genres"
              error={errors?.genre}
              disabled={view}
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldController
              name="specialty"
              control={control}
              defaultValue={selectedSuperHero?.specialty}
              label={translate('superHeroes.grid.columns.specialty')}
              placeholder={translate(
                'superHeroes.detail.form.specialtyPlaceHolder',
              )}
              variant="filled"
              multiline={true}
              rows={4}
              error={errors?.specialty}
              disabled={view}
              characterLimit={250}
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldController
              name="height"
              control={control}
              defaultValue={selectedSuperHero?.height}
              label={translate('superHeroes.grid.columns.height')}
              placeholder={translate(
                'superHeroes.detail.form.heightPlaceholder',
              )}
              variant="filled"
              type="number"
              error={errors?.height}
              disabled={view}
            />
          </Grid>
          <Grid item xs={6}>
            <TextfieldController
              name="weight"
              control={control}
              defaultValue={selectedSuperHero?.weight}
              label={translate('superHeroes.grid.columns.weight')}
              placeholder={translate(
                'superHeroes.detail.form.weightPlaceholder',
              )}
              variant="filled"
              type="number"
              error={errors?.weight}
              disabled={view}
            />
          </Grid>
          <Grid item xs={12}>
            <FormImgUpload
              name="picture"
              register={register}
              seletedItemPicture={selectedSuperHero?.picture}
              error={errors?.picture}
              view={view}
              onSave={handleSave}
              ref={imgUploadRef}
              previewCardTitle={translate('globals.detail.previewCardTitle')}
              imageErrorMessage={translate('globals.toasts.imageError')}
            />
          </Grid>
        </Grid>
      </FormCard>
    </form>
  );
};

export default SuperHeroDetailPage;
