import axios from "axios";

export default class ImageService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      withCredentials: true
    });
  }

  upload = async formData => {
    try {
      const data = await this.service.post("/upload", formData);
      return data.data.image;
    } catch (err) {
      console.log(err);
    }
  };
}
