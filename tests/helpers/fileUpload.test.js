import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dwprikelo',
    api_key: '999114727855289',
    api_secret: 'xzG2fuEiu8v3zmROC7kwbAVBWTA',
    secure: true
});

describe('Tests on fileUpload', () => {

    test('should upload the file correctly', async() => { 

        const imageUrl = 'https://images.unsplash.com/photo-1538961661728-ec9808cf62b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHw%3D&w=1000&q=80';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'image.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg','');

        console.log(imageId);

        const cloudResp = await cloudinary.api.delete_resources(['journal/'+imageId], {
            resource_type: 'image'
        });
        console.log({cloudResp});
    });

    test('should return null', async() => { 

        const file = new File([], 'image.jpg');
        const url = await fileUpload(file);

        expect(url).toBe(null);
    });
    
});