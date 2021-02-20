const CANVAS_WIDTH = inchesToPixels(8.5);
const CANVAS_HEIGHT = inchesToPixels(11);

const CANVAS_PADDING = inchesToPixels(0.25);
const PATTERN_SECTION_PADDING = 25;

const DEGREES = 5;

const TEXT_SIZE = 28;

let sample_img;

function preload() {
  sample_img = loadImage("eye_halftone.jpg");
}

function setup() {
  let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  adjustToDPI(canvas);
  canvas.parent("halftone_guide");

  background(255);

  var all_patterns = {
    "Grain Touch": new Riso("black"),
    "LPI 38": new Riso("black"),
    "LPI 50": new Riso("black"),
    "LPI 75": new Riso("black"),
    "LPI 100": new Riso("black"),
    "LPI 125": new Riso("black"),
    "LPI 150": new Riso("black"),
  };

  let pattern_section_height = (CANVAS_HEIGHT - (CANVAS_PADDING*2))/Object.keys(all_patterns).length;
  let image_size = pattern_section_height - TEXT_SIZE - (PATTERN_SECTION_PADDING*2);
  let pattern_section_width = (CANVAS_WIDTH - (CANVAS_PADDING*2) - image_size)/(DEGREES);

  let pattern_count = 0;

  for (let pattern in all_patterns) {
    let layer = all_patterns[pattern];
    let pattern_section_y = (pattern_count*pattern_section_height) + CANVAS_PADDING;

    layer.fill(255);
    layer.textAlign(LEFT, TOP);
    layer.textSize(TEXT_SIZE);
    layer.text(pattern, CANVAS_PADDING, pattern_section_y + PATTERN_SECTION_PADDING);

    for (let i = 0; i < DEGREES; i++) {
      layer.fill((255/DEGREES)*(i+1));
      layer.rect(CANVAS_PADDING + pattern_section_width*i, pattern_section_y + TEXT_SIZE + PATTERN_SECTION_PADDING, pattern_section_width, pattern_section_height - TEXT_SIZE - (PATTERN_SECTION_PADDING*2));
    }

    layer.image(sample_img, CANVAS_WIDTH - CANVAS_PADDING - image_size, pattern_section_y + TEXT_SIZE + PATTERN_SECTION_PADDING, image_size, image_size);

    pattern_count++
  }

  drawRiso();
}
