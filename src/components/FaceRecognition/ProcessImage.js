

function ProcessImage(box, height, width) {
  // const image = document.getElementById('scanImage');
  // const width = Number(image.clientWidth);
  // const height = Number(image.clientHeight);
  return {
    leftCol: box.leftCol * width,
    rightCol: box.rightCol * width,
    topRow: box.topRow * height,
    bottomRow: box.bottomRow * height
  };
}

export default ProcessImage;