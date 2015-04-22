// ==========================================================================
// Project:   Sites.searchSitesController
// Copyright: @2015 My Company, Inc.
// ==========================================================================
/*globals Sites */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Sites.searchSitesController = SC.ArrayController.create(
/** @scope Sites.searchSitesController.prototype */
{

  // From GitHub: thanks to Maurits Lamers
  allSitesBinding: SC.Binding.oneWay('Sites.sitesController.arrangedObjects'),

  searchBinding: SC.Binding.oneWay('Sites.sitesController.search'),

  searchHasChanged: function() {
    var s = this.get('search');
    var allSites = this.get('allSites');
    if (!s) {
      this.set('content', allSites);
    }
    else {
      var ret = [];
      s = s.toLowerCase();
      var qfield, obj;
      for (var i = 0,
      len = allSites.get('length'); i < len; i += 1) {
        obj = allSites.objectAt(i);
        qfield = obj.get('name').toLowerCase();
        if (qfield.indexOf(s) > -1) ret.push(obj);
      }
      this.set('content', ret);
    }
  }.observes('search')

});
