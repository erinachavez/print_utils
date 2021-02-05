const BaseSizeTypes = {
  bond: {
    width: 17,
    height: 22,
  },
  cover: {
    width: 20,
    height: 26,
  },
  bristol: {
    width: 22.5,
    height: 28.5,
  },
  index: {
    width: 25.5,
    height: 30.5,
  },
  text: {
    width: 25,
    height: 38,
  },
};

var byGsmForm = $("#by_gsm");
var byGsmResultsTable = byGsmForm.find(".results");
var byGsmResultsTableBody = byGsmResultsTable.children("tbody");
var byGsmErrorMessage = byGsmForm.find(".error");

var byPaperGradeForm = $("#by_paper_grade");
var byPaperGradeResultsTable = byPaperGradeForm.find(".results");
var byPaperGradeResultsTableBody = byPaperGradeResultsTable.children("tbody");
var byPaperGradeErrorMessage = byPaperGradeForm.find(".error");

$(document).ready(function() {
  byGsmResultsTable.hide();
  byGsmErrorMessage.hide();

  byPaperGradeResultsTable.hide();
  byPaperGradeErrorMessage.hide();

  byGsmForm.on("submit", displayByGsmResults);
  byPaperGradeForm.on("submit", displayByPaperGradeResults);
});

function displayByGsmResults(e) {
  e.preventDefault();

  let gsm = byGsmForm.find("input[name='gsm']").val();
  if (gsm) {
    let bond = gsmToBasisWeight(gsm, BaseSizeTypes.bond.width, BaseSizeTypes.bond.height);
    let cover = gsmToBasisWeight(gsm, BaseSizeTypes.cover.width, BaseSizeTypes.cover.height);
    let bristol = gsmToBasisWeight(gsm, BaseSizeTypes.bristol.width, BaseSizeTypes.bristol.height);
    let index = gsmToBasisWeight(gsm, BaseSizeTypes.index.width, BaseSizeTypes.index.height);
    let text = gsmToBasisWeight(gsm, BaseSizeTypes.text.width, BaseSizeTypes.text.height);

    byGsmErrorMessage.hide();
    byGsmResultsTableBody.html(`
      <tr>
        <td>${bond}</td>
        <td>${cover}</td>
        <td>${bristol}</td>
        <td>${index}</td>
        <td>${text}</td>
      </tr>
    `);

    byGsmResultsTable.show();
  }
  else {
    byGsmResultsTable.hide();
    byGsmErrorMessage.html("Please provide a GSM value.");
    byGsmErrorMessage.show();
  }

  byGsmForm.unbind("submit");
  byGsmForm.on("submit", displayByGsmResults);
}

function displayByPaperGradeResults(e) {
  e.preventDefault();

  let paperGrade = byPaperGradeForm.find("select[name='paper_grade']").val();
  let paperGradeWeight = byPaperGradeForm.find("input[name='paper_grade_weight']").val();

  if (!paperGrade) {
    byPaperGradeResultsTable.hide();
    byPaperGradeErrorMessage.html("Please select a paper grade.");
    byPaperGradeErrorMessage.show();
  }
  else if (!paperGradeWeight) {
    byPaperGradeResultsTable.hide();
    byPaperGradeErrorMessage.html("Please provide a weight value.");
    byPaperGradeErrorMessage.show();

  }
  else {
    let baseSizeWidth, baseSizeHeight;
    let bond, cover, bristol, index, text;

    switch (paperGrade) {
      case "bond":
        bond = paperGradeWeight;
        baseSizeWidth = BaseSizeTypes.bond.width;
        baseSizeHeight = BaseSizeTypes.bond.height;
        break;
      case "cover":
        cover = paperGradeWeight;
        baseSizeWidth = BaseSizeTypes.cover.width;
        baseSizeHeight = BaseSizeTypes.cover.height;
        break;
      case "bristol":
        bristol = paperGradeWeight;
        baseSizeWidth = BaseSizeTypes.bristol.width;
        baseSizeHeight = BaseSizeTypes.bristol.height;
        break;
      case "index":
        index = paperGradeWeight;
        baseSizeWidth = BaseSizeTypes.index.width;
        baseSizeHeight = BaseSizeTypes.index.height;
        break;
      case "text":
        text = paperGradeWeight;
        baseSizeWidth = BaseSizeTypes.text.width;
        baseSizeHeight = BaseSizeTypes.text.height;
        break;
      default:
        byPaperGradeResultsTable.hide();
        byPaperGradeErrorMessage.html("Invalid paper grade.");
        byPaperGradeErrorMessage.show();

    }

    let gsm = basisWeightToGsm(paperGradeWeight, baseSizeWidth, baseSizeHeight)
    if (gsm) {
      bond = bond ? bond : gsmToBasisWeight(gsm, BaseSizeTypes.bond.width, BaseSizeTypes.bond.height);
      cover = cover ? cover : gsmToBasisWeight(gsm, BaseSizeTypes.cover.width, BaseSizeTypes.cover.height);
      bristol = bristol ? bristol : gsmToBasisWeight(gsm, BaseSizeTypes.bristol.width, BaseSizeTypes.bristol.height);
      index = index ? index : gsmToBasisWeight(gsm, BaseSizeTypes.index.width, BaseSizeTypes.index.height);
      text = text ? text : gsmToBasisWeight(gsm, BaseSizeTypes.text.width, BaseSizeTypes.text.height);

      byPaperGradeErrorMessage.hide();
      byPaperGradeResultsTableBody.html(`
        <tr>
          <td>${gsm}</td>
          <td>${bond}</td>
          <td>${cover}</td>
          <td>${bristol}</td>
          <td>${index}</td>
          <td>${text}</td>
        </tr>
      `);

      byPaperGradeResultsTable.show();
    }
  }

  byPaperGradeForm.unbind("submit");
  byPaperGradeForm.on("submit", displayByPaperGradeResults);
}

function basisWeightToGsm(basisWeight, width, height) {
  return Math.round((basisWeight * 1406.5)/(width * height));
}

function gsmToBasisWeight(gsm, width, height) {
  return Math.round((gsm * (width * height))/1406.5);
}
