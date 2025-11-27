import { useCallback, useState, type FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '~/lib/utils';

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader: FC<FileUploaderProps> = ({ onFileSelect }) => {
  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      const file = acceptedFile[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { 'application/pdf': ['.pdf'] },
      maxSize: 20 * 1024 * 1024,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className='w-full gradient-border'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className='space-y-4 cursor-pointer'>
          {file ? (
            <div
              className='uploader-selected-file'
              onClick={(e) => e.stopPropagation()}
            >
              <img src='/images/pdf.png' alt='pdf' className='size-10' />
              <div className='flex items-center space-x-3'>
                <div className='text-center'>
                  <p className='text-lg text-gray-700 font-medium truncate max-w-xs'>
                    {file.name}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              <button
                className='p-2 cursor-pointer'
                onClick={(_) => {
                  onFileSelect?.(null);
                }}
              >
                <img src='/icons/cross.svg' alt='remove' className='size-4' />
              </button>
            </div>
          ) : (
            <div className='p-5 bg-white rounded-2xl flex flex-col items-center justify-center gap-7 sm:min-h-60'>
              <div className='size-16 sm:size-20'>
                <img
                  src='/icons/info.svg'
                  alt='upload'
                  className='w-full h-full'
                />
              </div>
              <div className='text-center'>
                <p className='text-2xl text-gray-600'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xl text-gray-600'>
                  PDF, PNG or JPG (max. 20MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
