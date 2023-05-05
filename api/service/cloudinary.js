import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name:'dg2c3liap',
  api_key:'195745443437264',
  api_secret:'XzlRSZl_H2DaGio9H9Xj3HOS8Wc'
});
const cloudinaryUpload = file => cloudinary.uploader.upload(file)
export default cloudinaryUpload