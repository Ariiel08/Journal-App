
export const fileUpload = async(file) => {
    if (!file) throw new Error('No files found');

    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/dwprikelo/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'journal-app');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error(`Image couldn't be uploaded`);

        const cloudResponse = await resp.json();

        return cloudResponse.secure_url;
    } catch (error) {
        throw new Error(error.message);
    }
}