// ==========================================================================
// Project:   Sites.SiteModel
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Sites.SiteModel = SC.Record.extend(
/** @scope Sites.SiteData.prototype */
{

  primaryKey: "_id",
  type: SC.Record.attr(String, {
    defaultValue: 'site'
  }),
  name: SC.Record.attr(String),
  zone: SC.Record.attr(String),
  country: SC.Record.attr(String),
  state: SC.Record.attr(String),
  group: SC.Record.attr(String),
  reference: SC.Record.attr(String),
  town: SC.Record.attr(String),
  altitude: SC.Record.attr(Number),
  activity: SC.Record.attr(String),
  material: SC.Record.attr(String),
  method: SC.Record.attr(String),
  production: SC.Record.attr(String),
  rcs: SC.Record.attr(String),
  ces: SC.Record.attr(String),
  fvisits: SC.Record.attr(Number, {
    defaulValue: 0
  }),
  visits: SC.Record.toMany('Sites.VisitModel', {
    inverse: 'site',
    isMaster: YES
  })

});
