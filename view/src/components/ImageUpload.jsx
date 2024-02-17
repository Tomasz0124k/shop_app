import React, { useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import { useAuthUser } from 'react-auth-kit'
import styled from "styled-components";
import { SERVER_URL } from '../config';

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: black;
  cursor: pointer;
  border: teal 2px solid
`;

export default function ImageUpload(props) {
  const user = useAuthUser();
  const userDetails = JSON.parse(localStorage.getItem('user') || '{}')

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  useEffect(() => {
    // if (userDetails.logo)
    // setImages([{ data_url: SERVER_URL + '/uploads/avatars/' + userDetails.logo }])
  }, [])

  const onChange = async (imageList, addUpdateIndex) => {
    setImages(imageList);
    // var form = new FormData();
    // form.append(props.name, imageList[0].file);
    // form.append('user', user().id);
    // const response = await useApi.sendFile('/user/avatar/upload', form)

    const response = await fetch(SERVER_URL + '/product/photo/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '/',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        image: imageList[0].data_url
      })
    })

    //   axios({
    //     url: `${SERVER_URL}/user/avatar/upload`,
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `EquineAdvisor ${localStorage.getItem('token')}`,
    //         // 'HorseId': body.horseId
    //     },
    //     data: JSON.stringify(opts),
    // })
    //     .then((response) => {
    //         return resolve()
    //     })

    // if (response) {
    //   var userDetails = await request('/user/get')
    //   localStorage.setItem('user', JSON.stringify(userDetails))
    // }

  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper" style={{ height: "70%" }}>
            {!images.length ?
              <Button
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                {/* <CloudUploadIcon /> */}
                &nbsp;
                Prześlij zdjęcie
              </Button>
              : ''}
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item" style={{ height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <img src={image['data_url']} alt="" width="100" style={{ maxHeight: "100%" }} />
                <div className="image-item__btn-wrapper">
                  <Button onClick={() => onImageUpdate(index)}>Aktualizuj</Button>
                  <Button color="error" onClick={() => onImageRemove(index)}>Usuń</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}