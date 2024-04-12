import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

axios({
  method: 'post',
  url: 'http://localhost:8000/api/books',
  headers: headers,
  data: {
    // your data here
  }
})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
});
