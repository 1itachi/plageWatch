import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
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

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export default function StyledDropzone(props: any) {

  const onDrop = (acceptedFiles: any) => {
    props.onChange(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop, accept:
      '.zip'
  });

  const {
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: '.zip' });

  const style: any = useMemo(() => ({
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
             props.submission.map((file: any, index: number) => <div key={index}>{file.path}   </div>)
          }
        </div>
      </div>
    </>
  );
}
