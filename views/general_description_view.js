// ==========================================================================
// Project:   Sites.GeneralDescriptionView
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your View Here)

  @extends SC.View
*/

Sites.GeneralDescriptionView = SC.SplitView.extend({
  layout: { top: 8, bottom: 8, left: 0, right: 0 },
  childViews: ['leftView', 'middleView', 'rightView'],
	
// ..........................................................
// Basic
//
  leftView: SC.LabelView.design(SC.SplitChild, {
    minimumSize: 80,
	  childViews: ['lblSite', 'colSite'],

		// === LABEL LEFT ===
	  lblSite: SC.LabelView.extend({
			layout: Sites.LAYOUT_LBL,
	    value: 'BASIC DATA'
	  }),

		// === COLUMN BASIC ===
	  colSite: SC.View.extend({
			layout: Sites.LAYOUT_COL,
	    childViewLayout: SC.View.VERTICAL_STACK,
			childViewLayoutOptions: Sites.LAYOUT_VERTICAL,
	    childViews: ['lblName', 'txtName', 'lblZone', 'cbxZone', 'lblCountry', 'cbxCountry',
			'lblState', 'txtState', 'lblGroup', 'txtGroup', 'lblRefSite', 'radRefSite',
			'lblTown', 'txtTown', 'lblAltitude', 'txtAltitude'],

	    // === NAME ===
	    lblName: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'NAME'
	    }),
			txtName: SC.TextFieldView.design({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the name here...',
				valueBinding: 'Sites.siteController.name'
			}),

	    // === ZONE ===
	    lblZone: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'ZONE'
	    }),
	    cbxZone: SC.SelectView.extend({
				layout: Sites.LAYOUT_CBX,
	      itemTitleKey: 'title',
				itemValueKey: 'value',
				itemActionKey: 'action',
				valueBinding: 'Sites.siteController.zone',
				emptyName: 'Set the zone here...',
	      items: [
	      {
	        title: 'South America (SA)',
					value: 'SA'
	      },
	      {
					title: 'North and Central America (NCA)',
					value: 'NCA'
	      },
	      {
	        title: 'Australia, NewZeland and... (ANA)',
					value: 'ANA'
	      },
	      {
	        title: 'Europe (EU)',
					value: 'EU'
	      },
				{
					title: 'unknown',
					value: ''
				}]
	    }),

	    // === COUNTRY ===
	    lblCountry: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'COUNTRY'
	    }),
	    cbxCountry: SC.SelectView.extend({
				layout: Sites.LAYOUT_CBX,
	      itemTitleKey: 'title',
				itemValueKey: 'value',
				valueBinding: 'Sites.siteController.country',
				emptyName: 'Set the country here...',
				items: [{
				  title: 'Chile',
					value: 'CL'
				},
				{
				  title: 'Argentina',
					value: 'AR'
				},
				{
				  title: 'Australia',
					value: 'AU'
				},
				{
				  title: 'unknown',
					value: ''
				},
	      {
					isSeparator: YES
	      },
				{
				  title: 'Other...',
					value: 'other'
				}],
				countryHasChanged: function(){
					console.log("countryHasChanged", this.value);
					if (this.value === "other") {
						Sites.paneCountriesController.openPane();
					}		  		
				}.observes('this.value')
	    }),


	    // === STATE / REGION ===
	    lblState: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'STATE/REGION'
	    }),
			txtState: SC.TextFieldView.design({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the state/region here...',
				valueBinding: 'Sites.siteController.state'
			}),

	    // === GROUP ===
	    lblGroup: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'GROUP'
	    }),
			txtGroup: SC.TextFieldView.design({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the group here...',
				valueBinding: 'Sites.siteController.group'
			}),
			
	    // === REFERENCE SITE ===
	    lblRefSite: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'REFERENCE SITE'
	    }),
	    radRefSite: SC.RadioView.extend({
	      classNames: ['btn-label'],
	      layout: {left: 12, height: 24 },
	      itemTitleKey: 'title',
				valueBinding: 'Sites.siteController.reference',
	      itemValueKey: 'value',
				itemIsEnabledKey: 'enabled',
	      items: [{
	        title: 'Yes',
	        value: 'Yes',
	        enabled: true
	      },
	      {
	        title: 'No',
	        value: 'No',
	        enabled: true
	      },
	      {
	        title: 'N/A',
	        value: 'N/A',
	        enabled: true
	      }],
	      layoutDirection: SC.LAYOUT_HORIZONTAL
	    }),

	    // === TOWN OR NEAREST ===
	    lblTown: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'TOWN OR NEAREST'
	    }),
	    txtTown: SC.TextFieldView.design({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the nearest town here...',
				valueBinding: 'Sites.siteController.town'
	    }),
			
	    // === ALTITUDE ===
	    lblAltitude: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'ALTITUDE (m)'
	    }),
	    txtAltitude: SC.TextFieldView.design({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the altitude here...',
				valueBinding: 'Sites.siteController.altitude'
	    })
			
		})
  }),
	
// ..........................................................
// Operation
//	
  middleView: SC.LabelView.design(SC.SplitChild, {
    minimumSize: 80,
		childViews: ['lblOperation', 'colOperation'],
		
	  // === LABEL MIDDLE ===
	  lblOperation: SC.LabelView.extend({
	    layout: Sites.LAYOUT_LBL,
	    value: 'OPERATION'
	  }),

	  // === COLUMN INFORMATION ===
	  colOperation: SC.View.extend({
			layout: Sites.LAYOUT_COL,
	    childViewLayout: SC.View.VERTICAL_STACK,
			childViewLayoutOptions: Sites.LAYOUT_VERTICAL,
	    childViews: ['lblActivity', 'cbxActivity', 'lblMaterial', 'lblMaterial2ndLine', 'cbxMaterial',
			'lblMethod', 'cbxMethod', 'lblProduction', 'txtProduction'],
	    
			// === MAIN ACTIVITY ===
	    lblActivity: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'MAIN ACTIVITY'
	    }),
	    cbxActivity: SC.SelectView.extend({
				layout: Sites.LAYOUT_CBX,
	      itemTitleKey: 'title',
				itemValueKey: 'value',
				valueBinding: 'Sites.siteController.activity',
				emptyName: 'Set the main activity here...',
	      items: [{
	        title: 'Surface Mining',
					value: 'SM'
	      },
	      {
	        title: 'Underground Mining',
					value: 'UM'
	      },
	      {
	        title: 'Quarry',
					value: 'Quarry'
	      },
	      {
	        title: 'Cement',
					value: 'Cement'
	      },
	      {
	        title: 'Infrastructure',
					value: 'Infra'
	      },
	      {
	        title: 'Port',
					value: 'Port'
	      },
	      {
	        title: 'Lift',
					value: 'Lift'
	      },
	      {
	        title: 'Airport',
					value: 'Airport'
	      }]
	    }),
			
	    // === MATERIAL EXTRACTED ===
	    lblMaterial: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'MATERIAL EXTRACTED'
	    }),
	    lblMaterial2ndLine: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: '(Only for SM, Quary & UG)'
	    }),
	    cbxMaterial: SC.SelectView.extend({
				layout: Sites.LAYOUT_CBX,
	      itemTitleKey: 'title',
				itemValueKey: 'value',
				valueBinding: 'Sites.siteController.material',
				emptyName: 'Set the material here...',
	      items: [{
	        title: 'Aggregate',
					value: 'Aggregate'
	      },
	      {
	        title: 'Cement',
					value: 'Cement'
	      },
	      {
	        title: 'Coal',
					value: 'Coal'
	      },
	      {
	        title: 'Copper',
					value: 'Copper'
	      },
	      {
	        title: 'Diamond',
					value: 'Diamond'
	      },
	      {
	        title: 'Gold',
					value: 'Gold'
	      },
	      {
	        title: 'Iron Ore',
					value: 'Iron Ore'
	      },
	      {
	        title: 'Other...',
					value: 'Other...'
	      }]
	    }),
			
	    // === METHOD UG ===
	    lblMethod: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'EXTRACTION METHOD (Only for UG)'
	    }),
	    cbxMethod: SC.SelectView.extend({
				layout: Sites.LAYOUT_CBX,
	      itemTitleKey: 'title',
				itemValueKey: 'value',
				valueBinding: 'Sites.siteController.method',
				emptyName: 'Set the method here...',
	      items: [{
	        title: 'Block caving',
					value: 'Block caving'
	      },
	      {
	        title: 'Continuous mining',
					value: 'Continuous mining'
	      },
	      {
	        title: 'Cut and fill',
					value: 'Cut and fill'
	      },
	      {
	        title: 'Longhole stoping',
					value: 'Longhole stoping'
	      },
	      {
	        title: 'Longwall mining',
					value: 'Longwall mining'
	      },
	      {
	        title: 'Room and pillar',
					value: 'Room and pillar'
	      },
	      {
	        title: 'Shrinkage stopping',
					value: 'Shrinkage stopping'
	      },
	      {
	        title: 'Sublevel stopping',
					value: 'Sublevel stopping'
	      },
	      {
	        title: 'unkown',
					value: ''
	      }]
	    }),
			
	    // === PRODUCTION PER YEAR ===
	    lblProduction: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'PRODUCTION PER YEAR'
	    }),
	    txtProduction: SC.TextFieldView.extend({
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the production here...',
				valueBinding: 'Sites.siteController.production'
	    })
	  })	
  }),
	
// ..........................................................
// Michelin
//		
  rightView: SC.LabelView.design(SC.SplitChild, {
    minimumSize: 80,
	  childViews: ['lblMichelin', 'colMichelin'],
		
	  // === LABEL RIGHT ===
	  lblMichelin: SC.LabelView.extend({
			layout: Sites.LAYOUT_LBL,
	    value: 'MICHELIN'
	  }),

	  // === COLUMN MICHELIN ===
	  colMichelin: SC.View.extend({
			layout: Sites.LAYOUT_COL,
	    childViewLayout: SC.View.VERTICAL_STACK,
			childViewLayoutOptions: Sites.LAYOUT_VERTICAL,
	    childViews: ['lblRCS', 'txtRCS', 'lblCES', 'txtCES',
			'lblFVisits', 'cbxFVisits', 'lblVisits', 'tblVisits', 'txtVisits', 'lstVisits'],

	    // === RCS NAME ===
	    lblRCS: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'RCS NAME'
	    }),
	    txtRCS: SC.TextFieldView.extend({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the RCS here...',
				valueBinding: 'Sites.siteController.rcs'
	    }),
			
	    // === CES NAME ===
	    lblCES: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'CES NAME'
	    }),
	    txtCES: SC.TextFieldView.extend({
				classNames: ['acier-txtfield'],
				layout: Sites.LAYOUT_TXT,
			  hint: 'Set the CES here...',
				valueBinding: 'Sites.siteController.ces'
	    }),
			
	    // === VISIT FRECUENCY ===
	    lblFVisits: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'VISIT FRECUENCY'
	    }),
	    cbxFVisits: SC.SelectView.extend({
				layout: Sites.LAYOUT_CBX,
	      itemTitleKey: 'title',
				itemValueKey: 'value',
				valueBinding: 'Sites.siteController.fvisits',
				emptyName: 'Set the frequency visits here...',
	      items: [{
	        title: '≤ 1 Month',
					value: 1
	      },
	      {
	        title: '≤ 2 Month',
					value: 2
	      },
	      {
	        title: '≤ 3 Month',
					value: 3
	      },
	      {
	        title: '> 4 Month',
					value: 4
	      },
	      {
	        title: 'unknown',
					value: 0
	      }]
	    }),

	    // === VISITS ===
	    lblVisits: SC.LabelView.extend({
	      controlSize: SC.SMALL_CONTROL_SIZE,
				layout: Sites.LAYOUT_LBL,
	      value: 'VISITS'
	    }),

			// tblVisits: SCTable.TableView.design({
			//   layout: {
			//     left: 12,
			//     width: 280,
			//     height: 280
			//   },
			//
			//   contentBinding: 'Sites.visitsTableController.arrangedObjects',
			//   selectionBinding: 'Sites.visitsTableController.selection',
			//
			//   columnsBinding: 'Sites.visitsTableColumnsController.arrangedObjects',
			//   columnsSelectionBinding: 'Sites.visitsTableColumnsController.selection'
			//
			// }),

			txtVisits: SC.TextFieldView.design({
				layout: Sites.LAYOUT_TXT,
				// valueBinding: 'Sites.visitsController.nvisits', // OK
				// valueBinding: 'Sites.siteController.visits.name', // OK
				// valueBinding: 'Sites.siteController._id', // OK
				valueBinding: 'Sites.visitsController.content',
				// MCM
				txtVisitsHasChanged: function() {
					// var obj = this.value._sc_prevStoreIds;
					// console.log(obj);
					// if (obj){
					// 	obj.forEach(function(item){
					// 		console.log(item);
					// 	});
					// }
					// var queryVisits = Sites.VISITS_QUERY;
					// var visits = Sites.store.find(queryVisits);
					// console.log(Sites.siteController.get('_id'));
					// Controller get the data
					var obj = Sites.siteController.get('visits');
					// console.log('visitas=', obj, Sites.siteController.get('visits'), Sites.siteController.visits );
					console.log('visitas=', Sites.visitsController.content );

				}.observes('value')
				
				
			}),
			
			lstVisits: SC.ScrollView.extend({
			  layout: {left: 12, right: 12, height: 240 },
				hasHorizontalScroller: NO,

				contentView: SC.ListView.extend({
		      contentBinding: 'Sites.visitsController.arrangedObjects',
		      selectionBinding: 'Sites.visitsController.selection',
		      contentValueKey: 'name',
									
		      rowHeight: 21
	
		    })		
			})
			
			
			
		})
  })
});



