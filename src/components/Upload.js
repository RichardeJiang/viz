import * as axios from 'axios';

// const BASE_URL = 'http://localhost:8000';
const BASE_URL = 'http://chairviz.herokuapp.com';

function upload(formData) {
    // const url = `${BASE_URL}/photos/upload`;
    const url = '/upload/'
    return axios({
	  method: 'post',
	  url: url,
	  // data: {
	  //   formData
	  // },
	  data: formData,
	  config: { headers: {'Content-Type': 'multipart/form-data' }}
	}).then(function (response) {
		return response.data;
	    // console.log(response.data);
	}).catch(function (error) {
	    console.log(error);
	});
}

export { upload }