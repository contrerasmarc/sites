// ==========================================================================
// Project:   Sites
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Sites = SC.Application.create(
/** @scope Sites.prototype */
{

  NAMESPACE: 'Sites',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  // store: SC.Store.create().from(SC.Record.fixtures)
  // store: SC.Store.create().from(SC.FixturesDataSource.create({
  // 	simulateRemoteResponse: YES,
  // 	latency: 250
  // }))
  store: SC.Store.create({
    commitRecordsAutomatically: YES
  }).from("Sites.SiteDataSource"),

  // ..........................................................
  // Layouts for "columns" in Views (childViewLayout: SC.View.VERTICAL_STACK)
  // 
  LAYOUT_VERTICAL: {
    paddingBefore: 12,
    paddingAfter: 4,
    spacing: 4,
    bottom: 0
  },
  LAYOUT_CBX: {
    left: 12,
    height: 24,
    width: 184
  },
  LAYOUT_LBL: {
    left: 8,
    right: 8,
    height: 12
  },
  LAYOUT_TXT: {
    left: 12,
    height: 24,
    width: 200
  },
  LAYOUT_COL: {
    left: 0,
    right: 0,
    top: 20,
    bottom: 0
  }


});
