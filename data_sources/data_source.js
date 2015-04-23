// ==========================================================================
// Project:   Sites.DataSource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Sites */

Sites.SITES_QUERY = SC.Query.local(Sites.SiteModel, {

  isEditable: YES,
  destroyOnRemoval: YES,

  conditions: "type = 'site' "
});

// var siteId = '8f902265a0a1c9c19cb73041b6007354';

// Sites.VISITS_QUERY = SC.Query.local(Sites.VisitModel, {
// 	// siteId: '8f902265a0a1c9c19cb73041b6007354',
// 	siteIdBinding: SC.Binding.oneWay('Sites.siteController._id'),
// 	isEditable: YES,
// 	destroyOnRemoval: YES,
//
// 	// conditions: 'type = "visit" ' // OK
// 	// conditions: 'site_id = "8f902265a0a1c9c19cb73041b6007354" AND type = "visit" ' // OK
// 	conditions: "site_id = {qSite} AND type = 'visit' ", // OK
// 	// conditions: function(){
// 	// 	var dSite = this.get('siteId');
// 	// 	console.log("site_id = " + dSite + " AND type = 'visit' ");
// 	// 	return ("site_id = " + dSite + " AND type = 'visit' ");
// 	// },
// 	// conditions: "site_id = '8f902265a0a1c9c19cb73041b6007354' AND type = 'visit' ", // OK
// 	// parameters: { qSite: '8f902265a0a1c9c19cb73041b6007354' } // OK
// 	// parameters: { qSite: this.siteId },
// 	parameters: {
// 		// qSite: '8f902265a0a1c9c19cb73041b6007354'
// 		qSite: this.siteId
// 	},
//
// 	siteIdDidChange: function(){
// 		console.log('siteIdHasChanged');
// 		// console.log('Change de Site ID in VISITS_QUERY!', 'The Query:', this.conditions, 'Site ID', this.siteId, 'qSite', this.parameters);
// 		// var queryVisits = Sites.VISITS_QUERY;
// 		// var visits = Sites.store.find(queryVisits);
// 		// // Controller get the data
// 		// Sites.visitsController.set('content', visits);
// 		this.parameters.set('qSite', this.siteId );
// 	}.observes('siteId')
// });

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Sites.SiteDataSource = SC.DataSource.extend(
/** @scope Sites.SiteDataSource.prototype */
{

  _dbpath: 'sites',

  getServerPath: function(resourceName) {
    var path = '/' + this._dbpath + "//" + resourceName; //Estará bien el "//"? Si, está ok 24-feb-2015
    // console.log('ServerPath=', path);
    return path;

  },

  getServerView: function(viewName) {
    var path = '/' + this._dbpath + "/_design/sites_app/_view/" + viewName;
    // console.log('ServerView=', path);
    return path;

  },

  // ..........................................................
  // QUERY SUPPORT
  // 
  // fetch: function(store, query) {
  // 		console.log('store:', store, 'query', query);
  //   if (query === Sites.SITES_QUERY) {
  //     SC.Request.getUrl(this.getServerView('allSites'))
  //     					.json()
  //     					.header('Accept', 'application/json')
  //     					.notify(this, 'didFetchSites', store, query)
  //     					.send();
  //     return YES;
  //   } else if (query === Sites.VISITS_QUERY) {
  // 			SC.Request.getUrl(this.getServerView('allVisits'))
  // 					.json()
  // 					.header('Accept', 'application/json')
  // 					.notify(this, 'didFetchVisits', store, query)
  // 					.send();
  //   }
  //
  //   return NO; // return YES if you handled the query
  // },
  fetch: function(store, query) {
    if (query == Sites.SITES_QUERY) {
      SC.Request.getUrl(this.getServerView('allData')).json().header('Accept', 'application/json').notify(this, 'didFetchSites', store, query).send();
      return YES;
    } else if (query) {
      SC.Request.getUrl(this.getServerView('allData')).json().header('Accept', 'application/json').notify(this, 'didFetchVisits', store, query).send();
      return YES;
    }
    return NO; // return YES if you handled the query
  },

  didFetchSites: function(response, store, query) {
    if (SC.ok(response)) {
      var body = response.get('encodedBody');
      var couchResponse = SC.json.decode(body);
      var records = couchResponse.rows.getEach('value');
      store.loadRecords(Sites.SiteModel, records);
      store.dataSourceDidFetchQuery(query);
    }
    else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  didFetchVisits: function(response, store, query) {
    if (SC.ok(response)) {
      var body = response.get('encodedBody');
      var couchResponse = SC.json.decode(body);
      var records = couchResponse.rows.getEach('value');
      store.loadRecords(Sites.VisitModel, records);
      store.dataSourceDidFetchQuery(query);
    }
      else {
      store.dataSourceDidErrorQuery(query, response);
    }
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  retrieveRecord: function(store, storeKey) {

    if (SC.kindOf(store.recordTypeFor(storeKey), Sites.SiteModel)) {
      var id = store.idFor(storeKey);
      SC.Request.getUrl(this.getServerPath(id)).header('Accept', 'application/json').json().notify(this, 'didRetrieveSite', store, storeKey).send();

      return YES;
    }
    return NO; // return YES if you handled the storeKey
  },

  didRetrieveSite: function(response, store, storeKey) {
    if (SC.ok(response)) {
      var dataHash = response.get('body').content;
      store.dataSourceDidComplete(storeKey, dataHash);

    } else {
      store.dataSourceDidError(storeKey, response);
    }
  },

  // ..........................................................
  // PROCESS RESPONSE FOR CREATE, UPDATE, DELETE
  // 
  /**
  Process response from CouchDB of create, update, delete operations.

  @returns id,rev for success, null for failure.
  */
  processResponse: function(response) {
    //console.log('processResponse-response=', response);
    if (SC.ok(response)) {
      var body = response.get('encodedBody');
      // console.log('processResponse-body=', body);
      var couchResponse = SC.json.decode(body);
      // console.log('processResponse-couchResponse=', couchResponse.toString());
      var ok = couchResponse.ok;
      if (ok != YES) return {
        "error": true,
        "response": couchResponse
      };

      var id = couchResponse.id;
      var rev = couchResponse.rev;
      return {
        "ok": true,
        "id": id,
        "rev": rev
      };
    } else {
      return {
        "error": true,
        "response": response
      };
    }
  },

  /**
  Get the latest revision of the document.
  For docs which were fetch from the server we use _rev field,
  and for docs that were modified we use the local _docsRev dictionary.
  */
  getDocRev: function(doc) {
    return doc._rev;
  },

  // ..........................................................
  // CREATE (POST)
  // 
  createRecord: function(store, storeKey) {
    // console.log('>>> createRecord triggered');
    if (SC.kindOf(store.recordTypeFor(storeKey), Sites.SiteModel)) {
      // SC.Request.postUrl(this.getServerPath('/')).json().header('Accept', 'application/json').notify(this, this.didCreateSite, store, storeKey).send(store.readDataHash(storeKey));
      SC.Request.postUrl(this.getServerPath('/')).json().header('Accept', 'application/json').notify(this, this.didCreateSite, store, storeKey).send(store.readDataHash(storeKey));
      return YES;
    }

    return NO; // return YES if you handled the storeKey
  },

  didCreateSite: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    // console.log('Create-couchRes=', couchRes)
    if (couchRes.ok) {
      // Add _id and _rev to the local document for further server interaction.
      var localDoc = store.readDataHash(storeKey);
      localDoc._id = couchRes.id;
      localDoc._rev = couchRes.rev;

      // console.log('Create-arg1:storeKey=', storeKey);
      // console.log('Create-arg2:localDoc=', localDoc);
      // console.log('Create-arg3:couchRes.id=', couchRes.id);
      store.dataSourceDidComplete(storeKey, localDoc, couchRes.id);

      //console.log(store.find(Sites.SiteData, storeKey).toString());
    } else {
      store.dataSourceDidError(storeKey, response);
    }
  },

  // ..........................................................
  // UPDATE (PUT, PATCH)
  // 
  updateRecord: function(store, storeKey) {
    // console.log('>>> UPDATE RECORD TRIGGERED <<<');
    // console.log('Update-Record Status=', store.readStatus(storeKey));
    // console.log("Update-BEFORE.Record-status=", store.find(Sites.SiteData, store.idFor(storeKey)).toString());
    //console.log('Update-store.recordTypeFor(storeKey)=', store.recordTypeFor(storeKey));
    //console.log('Update-SC.kindOf(store.recordTypeFor(storeKey), Sites.SiteData)', SC.kindOf(store.recordTypeFor(storeKey), Sites.SiteData));
    if (SC.kindOf(store.recordTypeFor(storeKey), Sites.SiteModel)) {
      var id = store.idFor(storeKey);
      //console.log("Update-id=", id);
      var dataHash = store.readDataHash(storeKey);
      // console.log("Update-rev=", this.getDocRev(dataHash));
      // console.log("Update-dataHash=", dataHash);

      var status = store.readStatus(storeKey);
      // console.log('Update-Record Status=', status);
      // SC.Request.putUrl(this.getServerPath(id)).json().header('Accept', 'application/json').notify(this, this.didUpdateSite, store, storeKey).send(dataHash);
      //console.log("Update-this.getServerPath(id)", this.getServerPath(id));
      // console.log("+++ Just BEFORE sending the request ++++ ");
      SC.Request.putUrl(this.getServerPath(id)).json().header('Accept', 'application/json').notify(this, this.didUpdateSite, store, storeKey).send(dataHash);

      // console.log("+++ Just AFTER sending the request ++++ ");
      return YES;
    }
    return NO;
  },

  didUpdateSite: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    // console.log("Update-couchRes=", couchRes);
    var results = response.get('body');
    // console.log("Update-results = response.get('body')=", results);
    if (couchRes.ok) {
      // Update the local _rev of this document.
      var localDoc = store.readDataHash(storeKey);
      var status = store.readStatus(storeKey);

      localDoc._id = couchRes.id; // puesto por mi
      localDoc._rev = couchRes.rev;

      // console.log('Update-Record Status=', status);
      // console.log('Update-arg1:storeKey=', storeKey);
      // console.log('Update-arg2:localDoc=dataHash=', localDoc);
      store.dataSourceDidComplete(storeKey, localDoc);
      // store.dataHashDidChange(storeKey);
      // store.flush();
      // console.log('Update-Record Status AFTER store.dataSourceDidComplete=', status);
      // console.log("Update-AFTER.Record-status==", store.find(Sites.SiteData, localDoc._id).toString());
    } else {
      store.dataSourceDidError(storeKey);
    }
  },

  // ..........................................................
  // DESTROY
  // 
  destroyRecord: function(store, storeKey) {
    // console.log('>>> destroyRecord triggered')
    if (SC.kindOf(store.recordTypeFor(storeKey), Sites.SiteModel)) {
      var id = store.idFor(storeKey);
      //var rev = this._docsRev[id];	
      var dataHash = store.readDataHash(storeKey);
      var rev = this.getDocRev(dataHash);
      SC.Request.deleteUrl(this.getServerPath(id + "?rev=" + rev)).json().header('Accept', 'application/json').notify(this, this.didDeleteSite, store, storeKey).send();

      return YES;
    }

    return NO; // return YES if you handled the storeKey
  },

  didDeleteSite: function(response, store, storeKey) {
    var couchRes = this.processResponse(response);
    // console.log('Delete-couchRes=', couchRes);
    if (couchRes.ok) {
      // console.log('Delete-arg1:storeKey=', storeKey);
      store.dataSourceDidDestroy(storeKey);
    } else {
      store.dataSourceDidError(response);
    }
  }

});
