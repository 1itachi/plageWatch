import React, { ReactElement, useMemo } from 'react';
import { useDropzone, DropzoneState } from 'react-dropzone';
import { UploadBaseStyle, UploadBoxBorder } from '../../customTypes/UploadBoxStyle';

const baseStyle: UploadBaseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#2196f3',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#b3b1b1',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle: UploadBoxBorder = {
  borderColor: '#2196f3'
};

const acceptStyle: UploadBoxBorder = {
  borderColor: '#00e676'
};

const rejectStyle: UploadBoxBorder = {
  borderColor: '#ff1744'
};

interface DropZoneProps {
  onChange: Function;
  submission: Array<File>;
}

export default function StyledDropzone(props: DropZoneProps): ReactElement {

  const onDrop = (acceptedFiles: Array<File>): void => {
    props.onChange(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept:
    '.zip', maxSize: 15 * 1024 * 1024
  });

  const {
    isDragActive,
    isDragAccept,
    isDragReject
  }: DropzoneState = useDropzone({ accept: '.zip' });

  const style: UploadBaseStyle = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} multiple={false} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>Only .zip files are accepted</em>
        </div>
        <div>
          {
            props.submission.map((file: File, index: number) => <div key={index}>{file.name} </div>)
          }
        </div>
      </div>
    </>
  );
}
