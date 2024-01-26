// import credentials from '../../Credentials.js';
//
// let box = {
//   "topRow": "",
//   "leftCol": "",
//   "bottomRow": "",
//   "rightCol": ""
// };
//
// function Clarifai(IMAGE_URL) {
//
//   console.log(IMAGE_URL);
//
//   const creds = JSON.parse(credentials());
//   const PAT = creds.PAT;
//   const USER_ID = creds.USER_ID;
//   const APP_ID = creds.APP_ID;
//   const MODEL_ID = creds.MODEL_ID;
//   const MODEL_VERSION_ID = creds.MODEL_VERSION_ID;
//
//   const raw = JSON.stringify({
//     "user_app_id": {
//       "user_id": USER_ID,
//       "app_id": APP_ID
//     },
//     "inputs": [
//       {
//         "data": {
//           "image": {
//             "url": IMAGE_URL
//             // "base64": IMAGE_BYTES_STRING
//           }
//         }
//       }
//     ]
//   });
//
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };
//
// // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// // this will default to the latest version_id
//
//   let boxes = [];
//
//   fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
//     .then(response => response.json())
//     .then(result => {
//       const regions = result.outputs[0].data.regions;
//       console.log(regions);
//       regions.forEach(region => {
//         const boundingBox = region.region_info.bounding_box;
//         box.topRow = boundingBox.top_row.toFixed(3);
//         box.leftCol = boundingBox.left_col.toFixed(3);
//         box.bottomRow = boundingBox.bottom_row.toFixed(3);
//         box.rightCol = boundingBox.right_col.toFixed(3);
//         boxes.push(box)
//       })
//     })
//     .then(return boxes)
//     .catch(error => console.log('error', error));
//
// }
// export default Clarifai;