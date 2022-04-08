import { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Option } from 'interfaces';
import { convertEnumToKeyValueArray } from 'utils';
import { GenreEnum, httpMethodKeys, regExp } from 'constant';
import { SuperHero } from 'modules/super-hero/interfaces/superHero';
import { useSuperHero } from 'modules/super-hero/hooks/useSuperHero';
import { SelectController, TextfieldController } from 'components';

export const SuperHeroDetailPage = () => {
  const { t: translate } = useTranslation();
  const history = useHistory();
  const genres: Option[] = convertEnumToKeyValueArray(GenreEnum);
  const { selectedSuperHero, saveOrUpdate } = useSuperHero();
  const schema = yup
    .object({
      name: yup
        .string()
        .matches(regExp.alphabet, translate('validations.pattern.alphabet'))
        .required(translate('validations.required')),
      genre: yup
        .mixed()
        .oneOf(Object.values(GenreEnum), translate('validations.required'))
        .required(),
      specialty: yup
        .string()
        .min(10, translate('validations.minlength', { param: 10 }))
        .max(250, translate('validations.maxlength', { param: 250 }))
        .required(translate('validations.required')),
      age: yup
        .number()
        .typeError(translate('validations.required'))
        .positive(translate('validations.pattern.positive'))
        .integer(),
      height: yup
        .number()
        .typeError(translate('validations.required'))
        .positive(translate('validations.pattern.positive')),
      weight: yup
        .number()
        .typeError(translate('validations.required'))
        .positive(translate('validations.pattern.positive')),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const [view, setView] = useState(false);

  useEffect(() => {
    setView((history.location.state as { view: boolean })?.view);
  }, [history, setView]);

  const onSubmit = async (value: unknown) => {
    const opType = selectedSuperHero ? httpMethodKeys.put : httpMethodKeys.post;
    await saveOrUpdate(opType, value as SuperHero, selectedSuperHero);
    handleReturn();
  };

  const handleReturn = () =>
    history.length <= 2 ? history.push('/') : history.goBack();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title={translate('superHeroes.detail.title')} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextfieldController
                name='name'
                control={control}
                defaultValue={selectedSuperHero?.name}
                label={translate('superHeroes.grid.columns.name')}
                placeholder={translate(
                  'superHeroes.detail.form.namePlaceholder',
                )}
                variant='filled'
                error={errors?.name}
                disabled={view}
              />
            </Grid>
            <Grid item xs={6}>
              <TextfieldController
                name='age'
                control={control}
                defaultValue={selectedSuperHero?.age}
                label={translate('superHeroes.grid.columns.age')}
                placeholder={translate(
                  'superHeroes.detail.form.agePlaceholder',
                )}
                variant='filled'
                type='number'
                error={errors?.age}
                disabled={view}
              />
            </Grid>
            <Grid item xs={6}>
              <SelectController
                name='genre'
                control={control}
                defaultValue={selectedSuperHero?.genre}
                defaultSelectLabel={translate('globals.selectDefault')}
                label={translate('superHeroes.grid.columns.genre')}
                placeholder={translate(
                  'superHeroes.detail.form.genrePlaceHolder',
                )}
                options={genres}
                optionLabels={{ path: 'globals.enums.genres', type: GenreEnum }}
                error={errors?.genre}
                disabled={view}
              />
            </Grid>
            <Grid item xs={6}>
              <TextfieldController
                name='specialty'
                control={control}
                defaultValue={selectedSuperHero?.specialty}
                label={translate('superHeroes.grid.columns.specialty')}
                placeholder={translate(
                  'superHeroes.detail.form.specialtyPlaceHolder',
                )}
                variant='filled'
                multiline={true}
                rows={4}
                error={errors?.specialty}
                disabled={view}
              />
            </Grid>
            <Grid item xs={6}>
              <TextfieldController
                name='height'
                control={control}
                defaultValue={selectedSuperHero?.height}
                label={translate('superHeroes.grid.columns.height')}
                placeholder={translate(
                  'superHeroes.detail.form.heightPlaceholder',
                )}
                variant='filled'
                type='number'
                error={errors?.height}
                disabled={view}
              />
            </Grid>
            <Grid item xs={6}>
              <TextfieldController
                name='weight'
                control={control}
                defaultValue={selectedSuperHero?.weight}
                label={translate('superHeroes.grid.columns.weight')}
                placeholder={translate(
                  'superHeroes.detail.form.weightPlaceholder',
                )}
                variant='filled'
                type='number'
                error={errors?.weight}
                disabled={view}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={view}
          >
            {translate('globals.buttons.save')}
          </Button>
          <Button variant='contained' onClick={handleReturn}>
            {translate('globals.buttons.cancel')}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
