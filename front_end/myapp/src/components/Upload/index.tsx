import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const TOKEN = '4230ff8d73ba06f02b6bda9a0e7f63d7';

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

// type IProps = {
//   getimageUrl: (url: string) => string;
// };

export const UploadAvatar = () => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setUrl] = useState('');
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const props = {
    beforeUpload: beforeUpload,
    onChange: (info: any) => {
      if (info.file.status === 'uploading') {
        setLoading(true);
        return;
      }
      if (info.file.status === 'done') {
        // this.props.getimageUrl(info.file.response.data.url);
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl: string) => {
          setUrl(imageUrl);
          setLoading(false);
        });
      }
    },
  };
  return (
    <Upload
      name="image"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://img.coolcr.cn/api/upload"
      headers={{ token: TOKEN }}
      {...props}
    >
      {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};
