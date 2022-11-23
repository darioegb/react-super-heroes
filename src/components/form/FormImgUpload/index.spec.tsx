import { useRef } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { mockFn, mockSnackBar } from 'setupTests';
import { FormImgUpload, FormImgUploadExpose } from '.';

jest.mock('utils', () => ({
  fileToBase64String: jest.fn(),
  fileRef: jest.fn(),
  fileName: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  uploadBytesResumable: mockFn,
  getDownloadURL: jest.fn(() => Promise.resolve('www.test.com/testImage.png')),
}));

describe('FormImgUpload', () => {
  const handleSave = jest.fn();
  const file = new File(['foo'], 'foo.png', {
    type: 'image/png',
  });
  let input: HTMLInputElement;
  let button: HTMLButtonElement;

  const FormImgUploadHost = () => {
    const imgUploadRef = useRef<FormImgUploadExpose>(null);
    const schema = yup
      .object({
        test: yup
          .mixed()
          .test(
            'fileSize',
            'Error',
            (value) => !value.length || value[0].size <= 200000,
          ),
      })
      .required();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    const onSubmit = async (_: Record<string, File[] | undefined>) =>
      imgUploadRef?.current?.initUploading();

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormImgUpload
          name="test"
          register={register}
          seletedItemPicture={undefined}
          error={errors?.test}
          view={false}
          onSave={handleSave}
          ref={imgUploadRef}
        />
        <button type="submit">SUBMIT</button>
      </form>
    );
  };

  const initRender = () => {
    render(<FormImgUploadHost />);
    input = screen.getByTestId('input-image-file')
      .childNodes[1] as HTMLInputElement;
    button = screen.getByText('SUBMIT') as HTMLButtonElement;
  };

  it('should render FormImgUpload', () => {
    initRender();
    expect(input).toBeInTheDocument();
  });

  it('should trigger update:picture event when file is added', async () => {
    initRender();
    userEvent.upload(input, file);
    await waitFor(() => {
      expect(input.files && input.files[0]).toStrictEqual(file);
    });
  });

  it('should trigger downloadUrlChange event when form is saved', async () => {
    mockFn.mockImplementationOnce(() => ({
      on: (
        _event: string,
        _next: unknown,
        _error: unknown,
        completed: () => unknown,
      ) => completed(),
      snapshot: {
        ref: 'testRef',
      },
    }));
    initRender();
    userEvent.upload(input, file);
    fireEvent.click(button);
    await waitFor(() => {
      expect(handleSave).toHaveBeenCalled();
    });
  });

  it('should update progress when file is uploading', async () => {
    mockFn.mockImplementationOnce(() => ({
      on: (
        _event: string,
        next: (snapshot: {
          bytesTransferred: number;
          totalBytes: number;
        }) => unknown,
        _error: unknown,
        _completed: unknown,
      ) => next({ bytesTransferred: 100, totalBytes: 200 }),
      snapshot: {
        ref: 'testRef',
      },
    }));
    initRender();
    userEvent.upload(input, file);
    fireEvent.click(button);
    expect(await screen.findByTestId('upload-progress')).toBeInTheDocument();
  });

  it("should'n trigger downloadUrlChange event when error ocurred", async () => {
    mockFn.mockImplementationOnce(() => ({
      on: (
        _event: string,
        _next: unknown,
        error: () => unknown,
        _completed: unknown,
      ) => error(),
      snapshot: {
        ref: 'testRef',
      },
    }));
    initRender();
    userEvent.upload(input, file);
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockSnackBar).toHaveBeenCalledWith('Image upload failed', {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        variant: 'error',
      });
    });
  });
});
