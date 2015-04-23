// ==========================================================================
// Project:   Sites - mainPage
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

// This page describes the main user interface for your application.
Sites.mainPage = SC.Page.design({

  mainPane: SC.MainPane.design({
    childViews: ['workspaceView'],

    workspaceView: SC.WorkspaceView.design({
      autoResizeToolbars: true,
      layout: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },

      // ..........................................................
      // Top Toolbar
      // 
      topToolbar: SC.ToolbarView.extend({
        childViews: ['title', 'btnAux'],
        layout: {
          height: 44
        },
        title: SC.LabelView.extend({
          classNames: ['my-title-label'],
          controlSize: SC.LARGE_CONTROL_SIZE,
          layout: {
            width: 220,
            height: 24,
            left: 8,
            centerY: 0
          },
          value: 'Sites'
        }),
        btnAux: SC.ButtonView.design({
          layout: {
            width: 220,
            height: 24,
            right: 8,
            centerY: 0
          },
          title: 'Nuevo',
          siteIdBinding: 'Sites.siteController.id',
          action: function(){
            var siteId = this.get('siteId');  
            console.log(siteId);
            var site = Sites.store.find(Sites.SiteModel, siteId);
            console.log(site);
            // site = Sites.store.createRecord(Sites.SiteModel, {
            //   "type": "site",
            //   "name": "new site",
            //   "zone": null,
            //   "country": null,
            //   "reference": null,
            //   "town": null,
            //   "altitude": 0,
            //   "activity": null,
            //   "material": null,
            //   "method": null,
            //   "production": null,
            //   "rcs": null,
            //   "ces": null,
            //   "fvisits": null
            // });
            var visit;
            visit = Sites.store.createRecord(Sites.VisitModel, {
              "type": "visit",
              "name": "visit1",
              "date": null,
              "days": 0
            });
            site.get('visits').pushObject(visit);
            visit = Sites.store.createRecord(Sites.VisitModel, {
              "type": "visit",
              "name": "visit2",
              "date": null,
              "days": 0
            });            
            site.get('visits').pushObject(visit);
          }
        })
      }),

      // ..........................................................
      // Menu and Explorer section
      // 
      contentView: SC.SplitView.extend({
        layout: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 20
        },
        childViews: ['leftView', 'rightView'],

        // ..........................................................
        // Left Side (Menu and Site List and Search)
        // 
        leftView: SC.View.extend(SC.SplitChild, {
          minimumSize: 160,
          size: 200,
          childViews: ['lblSite', 'theSections', 'txtSearch', 'lstSites', 'btnNew', 'btnRemove'],

          lblSite: SC.LabelView.design({
            layout: {
              right: 8,
              left: 8,
              height: 24,
              top: 4
            },
            controlSize: SC.LARGE_CONTROL_SIZE,
            valueBinding: 'Sites.siteController.name'
          }),

          theSections: SC.SegmentedView.extend({
            layout: {
              right: 8,
              left: 8,
              top: 32
            },
            layoutDirection: SC.LAYOUT_VERTICAL,
            controlSize: SC.LARGE_CONTROL_SIZE,
            selectSegmentWhenTriggeringAction: YES,
            itemTitleKey: 'title',
            itemValueKey: 'value',
            itemActionKey: 'action',
            itemTargetKey: 'target',
            itemIsEnabledKey: 'enabled',
            items: [
            SC.Object.create({
              title: 'General information',
              // target: 'Sites.statechart',
              // action: 'goGeneral',
              value: 'Sites.GeneralView'
              // enabledBinding: SC.Binding.oneWay('Sites.explorerController.sectionIsEnabled')
            }), SC.Object.create({
              title: 'Hauling conditions',
              // target: 'Sites.statechart',
              // action: 'goHauling',
              value: 'Sites.HaulingView'
              // enabledBinding: SC.Binding.oneWay('Sites.explorerController.sectionIsEnabled')
            }), SC.Object.create({
              title: 'Weather',
              // target: 'Sites.statechart',
              // action: 'goWeather',
              value: 'Sites.WeatherView'
              // enabledBinding: SC.Binding.oneWay('Sites.explorerController.sectionIsEnabled')
            })],
            valueBinding: 'Sites.explorerController.nowShowing'
            // valueBinding: 'Sites.MAINSTATE.nowShowing'
          }),

          txtSearch: SC.TextFieldView.extend({
            classNames: ['acier-txtfield'],
            layout: {
              width: 160,
              height: 24,
              top: 128,
              left: 8
            },
            hint: 'Search',
            applyImmediately: true,
            valueBinding: 'Sites.sitesController.search'
          }),

          lstSites: SC.ScrollView.extend({
            classNames: ['acier-list'],
            layout: {
              left: 8,
              right: 8,
              top: 160,
              bottom: 36
            },
            hasHorizontalScroller: NO,

            contentView: SC.ListView.extend({
              contentBinding: 'Sites.searchSitesController.arrangedObjects',
              selectionBinding: 'Sites.sitesController.selection',
              contentValueKey: 'name',
              rowHeight: 21,
              canEditContent: YES,
              canDeleteContent: YES,

              // MCM
              selectionHasChanged: function() {
                // console.log('OJO: selectionHasChanged');
                // console.log(this.get('selection').getEach('name'));

              }.observes('selection')

            })

          }),
          btnNew: SC.ImageButtonView.extend({
            layout: {
              width: 24,
              height: 24,
              bottom: 8,
              right: 8
            },
            image: 'add-button',
            toolTip: 'Add new site',
            target: "Sites.sitesController",
            action: "addSite"
          }),
          btnRemove: SC.ImageButtonView.extend({
            layout: {
              width: 24,
              height: 24,
              bottom: 8,
              right: 36
            },
            classNames: ['delete-button', 'tooltip'],
            image: 'delete-button',
            toolTip: 'Delete a site',
            target: "Sites.sitesController",
            action: "removeSite"
          })
        }),

        // ..........................................................
        // Right Side (Site Information Explorer)
        // 
        rightView: SC.View.design(SC.SplitChild, {
          minimumSize: 80,
          childViews: ['siteExplorer'],

          siteExplorer: SC.ContainerView.extend({
            layout: {
              left: 0,
              right: 0
            },

            nowShowingBinding: SC.Binding.oneWay('Sites.explorerController.nowShowing'),

            // transitionSwap: SC.ContainerView.PUSH,
            // transitionSwapOptions: { duration: 1.2, direction: 'down' },
            // The containers to show (Depending of leftView)
            generalView: 'Sites.GeneralView',
            haulingView: 'Sites.HaulingView',
            weatherView: 'Sites.WeatherView'
          })
        })
      }),

      // ..........................................................
      // Bottom Toolbar
      // 
      bottomToolbar: SC.ToolbarView.extend({
        anchorLocation: SC.ANCHOR_BOTTOM,
        childViews: ['lblSummary', 'lblVersion', 'lblDesigned'],
        layout: {
          height: 44
        },
        lblSummary: SC.LabelView.extend({
          classNames: ['field-label'],
          controlSize: SC.SMALL_CONTROL_SIZE,
          layout: {
            width: 220,
            height: 24,
            left: 8,
            centerY: 4
          },
          valueBinding: 'Sites.sitesController.summary'
        }),
        lblVersion: SC.LabelView.extend({
          classNames: ['field-label', 'center'],
          controlSize: SC.SMALL_CONTROL_SIZE,
          layout: {
            width: 264,
            height: 24,
            centerX: 0,
            centerY: 4
          },
          value: "Sites - Version 0.0.1"
        }),
        lblDesigned: SC.LabelView.extend({
          classNames: ['field-label', 'right'],
          controlSize: SC.SMALL_CONTROL_SIZE,
          layout: {
            width: 264,
            height: 24,
            right: 8,
            centerY: 4
          },
          value: "Designed by Marcos Contreras"
        })
      })

    })
  })
});
