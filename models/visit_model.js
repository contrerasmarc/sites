// ==========================================================================
// Project:   Sites.VisitModel
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Sites.VisitModel = SC.Record.extend(
/** @scope Sites.Visits.prototype */
{

  primaryKey: "_id",
  type: SC.Record.attr(String, {
    defaultValue: 'visit'
  }),
  name: SC.Record.attr(String),
  // date: SC.Record.attr(SC.DateTime, { format: 'dd-mm-YY'}),
  date: SC.Record.attr(String),
  days: SC.Record.attr(Number),
  site: SC.Record.toOne('Sites.SiteModel', {
    inverse: 'visits',
    isMaster: NO
  })

});
