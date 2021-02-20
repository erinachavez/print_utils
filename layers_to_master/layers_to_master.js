function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  adjustToDPI(canvas);
  canvas.parent("layers_to_master");

  $("#image_form input[type='file']").on("change", function() {
    var fileList = $(this)[0].files;

    for (let i = 0; i < fileList.length; i++) {
      var file = fileList[i];
      var fileName = (file.name).split(".").slice(0, -1).join(".");

      if (file.type.startsWith("image/")) {
        var img_file = document.createElement("img");
        img_file.file = file;

        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (function(img) {
          return function(e) {
            loadImage(e.target.result, p5Img => {
              resizeCanvas(p5Img.width, p5Img.height);

              var layer = new Riso(fileName);
              layer.fill(255);
              layer.image(p5Img, 0, 0);

              drawRiso();
            });
          };
        })(img_file);
      }
    }
  });
}
