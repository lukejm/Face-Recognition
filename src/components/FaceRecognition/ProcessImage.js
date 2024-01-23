

function ProcessImage(box) {
  const image = document.getElementById('scanImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: box.leftCol * width,
    rightCol: box.rightCol * width,
    topRow: box.topRow * height,
    bottomRow: box.bottomRow * height
  };
}

export default ProcessImage;