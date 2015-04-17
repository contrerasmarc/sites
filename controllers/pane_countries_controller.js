// ==========================================================================
// Project:   Sites.paneCountriesController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
Sites.paneCountriesController = SC.ObjectController.create(
/** @scope Sites.paneCountriesController.prototype */ {

	openPane: function(view) {
	  var pane = SC.PanelPane.create({
	  	layout: { width: 300, height: 300, centerX: 0, centerY:0 },
	  	contentView: SC.View.extend({	
		
	 			layout: { top: 0, left: 0, bottom: 0, right: 0 },
				childViews: ['lblCountries','txtCountries', 'lstCountries', 'btnCancel', 'btnOK'],
				
				lblCountries: SC.LabelView.design({
				  layout: {left: 8, right: 8, top: 8, height: 24 },
				  value: 'SELECT A COUNTRY'
				}),
				txtCountries: SC.TextFieldView.design({
				  layout: {left: 8, width: 160, top: 32, height: 24 },
				  hint: 'Search...',
				  isPassword: NO,
				  isTextArea: NO
				}),
				lstCountries: SC.ScrollView.extend({
				  layout: {left: 8, width: 196, top: 64, bottom: 44 },
					hasHorizontalScroller: NO,
	
					contentView: SC.ListView.extend({
			      // contentBinding: 'Sites.searchCountriesController.arrangedObjects',
			      // selectionBinding: 'Sites.countriesController.selection',
			      // contentValueKey: 'name',
			      // rowHeight: 21
		
			    })		

				}),
				btnOK: SC.ButtonView.design({
				  layout: {right:32, bottom:16, height:24, width:80},
					themeName: 'capsule',
				  title: 'OK',
				  action: function() {
						console.log('close!');
						pane.remove();
						//this.set('previewIsEnabled', true);
						// Tkph.analysisExplorerController.set('resultIsEnabled', true);
						// Tkph.analysisExplorerController.set('nowShowing', 'Tkph.AnalysisResultView');
						// Tkph.analysisExplorerController.set('nowShowingResult', 'Tkph.AnalysisSummaryView');
						
					}
				}),
				btnCancel: SC.ButtonView.design({
				  layout: {left:32, bottom:16, height:24, width:80},
					themeName: 'capsule',
				  title: 'Cancel',
				  action: function() {
						console.log('close!');
						Sites.siteController.set('country','');
						// console.log(Sites.siteController.get('country',''));
						pane.remove();
						
					}
				})
	    })
	  });
	  pane.append();
	}

});
