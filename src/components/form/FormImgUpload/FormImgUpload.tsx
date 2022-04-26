import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  FilledInput,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  LinearProgress,
  Typography,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSnackbar } from 'notistack';

import { fileName, fileRef, fileToBase64String } from 'utils';
import { anchorOrigin } from 'constant';

interface FormImgUploadProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  handleSaveOrUpdate: (downloadURL?: string) => Promise<void>;
  seletedItemPicture?: string;
  error?: Record<string, string>;
  view?: boolean;
}

export interface FormImgUploadExpose {
  initUploading: () => void;
}

export const FormImgUpload = forwardRef<FormImgUploadExpose, FormImgUploadProps>(
  (
    {
      name,
      register,
      handleSaveOrUpdate,
      seletedItemPicture,
      error,
      view,
    }: FormImgUploadProps,
    ref,
  ) => {
    const { t: translate } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [previewPicture, setPreviewPicture] = useState(
      seletedItemPicture || '',
    );
    const [isUploading, setIsUploading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isUploading) {
        setIsUploading(false);
        const files = inputRef?.current?.files;
        if (!files) return;
        const uploadTask = uploadBytesResumable(fileRef(fileName()), files[0]);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            setUploadProgress(snapshot.bytesTransferred / snapshot.totalBytes);
          },
          () => {
            enqueueSnackbar(translate('globals.toasts.imageError'), {
              variant: 'error',
              anchorOrigin,
            });
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            handleSaveOrUpdate(downloadURL);
          },
        );
      }
    }, [enqueueSnackbar, handleSaveOrUpdate, isUploading, translate]);

    useImperativeHandle(ref, () => ({
      initUploading: () => setIsUploading(true),
    }));

    const handleChange = async ({
      target: { files },
    }: ChangeEvent<HTMLInputElement>) => {
      if (!files) return;
      setPreviewPicture(await fileToBase64String(files[0]));
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl variant='filled' fullWidth disabled={view}>
            <FilledInput
              {...register(name)}
              type='file'
              inputProps={{
                accept: 'image/*',
              }}
              startAdornment={
                <InputAdornment position='start'>
                  <AttachFileIcon />
                </InputAdornment>
              }
              error={!!error}
              inputRef={inputRef}
              onChange={handleChange}
            />
          </FormControl>
          {!!error && <FormHelperText error>{error?.message}</FormHelperText>}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <LinearProgress variant='determinate' value={uploadProgress} />
          )}
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography gutterBottom variant='h5' component='div'>
                {translate('globals.detail.previewCardTitle')}
              </Typography>
              <CardMedia
                sx={{
                  maxHeight: '20rem',
                  objectFit: 'scale-down',
                  objectPosition: '50% 50%',
                }}
                component='img'
                image={
                  previewPicture || `${process.env.PUBLIC_URL}/img/no-image.png`
                }
                alt='no image'
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  },
);
