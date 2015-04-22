/*globals SCTableDemo SCTable*/

/*
  (Source data below is randomly generated.  None of it is real.)
*/

Sites.sampleRows = [];

Sites.sampleData = [{
  "name": "Lucy Bush",
  "date": "Oct 14, 2011",
  "days": 5
},
{
  "name": "Felicia Ortiz",
  "date": "Aug 1, 2010",
  "days": 10
},
{
  "name": "Samuel Hampton",
  "date": "Apr 21, 2011",
  "days": 7
}];

Sites.parseSampleData = function parseSampleData() {
  // console.log(Sites.siteController.visits._sc_prevStoreIds);
  var result = [];

  Sites.sampleData.forEach(function(row, index) {
    result.push(SC.Object.create(row));
  },
  this);

  Sites.set('sampleRows', result);
  Sites.set('sampleData', null);
};
