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
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useSnackbar } from 'notistack';

import { fileName, fileRef, fileToBase64String } from 'utils';
import { ANCHOR_ORIGIN } from 'constant';

interface FormImgUploadProps {
  /**
   * Name of uncontrol
   */
  name: string;
  /**
   * Uncontrol value
   */
  register: UseFormRegister<FieldValues>;
  /**
   * Fired when init save process.
   */
  onSave: (downloadURL?: string) => Promise<void>;
  /**
   * Default picture value. If valid for edit mode
   */
  seletedItemPicture?: string;
  /**
   * Error object from useForm
   */
  error?: Record<string, unknown>;
  /**
   * Flag for view mode
   */
  view?: boolean;
  /**
   * Optional preview card title. By default is Preview
   */
  previewCardTitle?: string;
  /**
   * Optional upload image error message. By default is Image upload failed
   */
  imageErrorMessage?: string;
}

export interface FormImgUploadExpose {
  initUploading: () => void;
}

export interface ImgUploadState {
  isUploading: boolean;
  previewPicture: string;
  uploadProgress: number;
}

/**
 * FormImgUpload is a file image uploader & preview file using mui.
 * The ref prop is important for calling initUploading method from the parent component,
 * when you needs to start the upload process.
 */
export const FormImgUpload = forwardRef<
  FormImgUploadExpose,
  FormImgUploadProps
>(
  (
    {
      name,
      register,
      onSave,
      seletedItemPicture,
      error,
      view,
      previewCardTitle = 'Preview',
      imageErrorMessage = 'Image upload failed',
    }: FormImgUploadProps,
    ref,
  ) => {
    const { enqueueSnackbar } = useSnackbar();
    const [{ isUploading, previewPicture, uploadProgress }, setImgUploadState] =
      useState<ImgUploadState>({
        isUploading: false,
        uploadProgress: 0,
        previewPicture: seletedItemPicture || '',
      });
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!isUploading) return;
      setImgUploadState((state) => ({ ...state, isUploading: false }));
      const files = inputRef?.current?.files;
      if (!files) return;
      const uploadTask = uploadBytesResumable(fileRef(fileName()), files[0]);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setImgUploadState((state) => ({
            ...state,
            uploadProgress: snapshot.bytesTransferred / snapshot.totalBytes,
          }));
        },
        () => {
          enqueueSnackbar(imageErrorMessage, {
            variant: 'error',
            anchorOrigin: ANCHOR_ORIGIN,
          });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onSave(downloadURL);
        },
      );
    }, [enqueueSnackbar, onSave, imageErrorMessage, isUploading]);

    useImperativeHandle(ref, () => ({
      initUploading: () =>
        setImgUploadState((state) => ({ ...state, isUploading: true })),
    }));

    const handleChange = async ({
      target: { files },
    }: ChangeEvent<HTMLInputElement>) => {
      if (!files) return;
      const previewPicture = await fileToBase64String(files[0]);
      setImgUploadState((state) => ({ ...state, previewPicture }));
    };

    return (
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl variant="filled" fullWidth disabled={view}>
            <FilledInput
              {...register(name)}
              data-testid="input-image-file"
              type="file"
              inputProps={{
                accept: 'image/*',
              }}
              startAdornment={
                <InputAdornment position="start">
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
            <LinearProgress
              data-testid="upload-progress"
              variant="determinate"
              value={uploadProgress}
            />
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
              <Typography gutterBottom variant="h5" component="div">
                {previewCardTitle}
              </Typography>
              <CardMedia
                sx={{
                  maxHeight: '20rem',
                  objectFit: 'scale-down',
                  objectPosition: '50% 50%',
                }}
                component="img"
                image={
                  previewPicture || `${process.env.PUBLIC_URL}/img/no-image.png`
                }
                alt="no image"
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  },
);
