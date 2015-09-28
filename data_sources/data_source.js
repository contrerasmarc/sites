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

/** @class

  (Document Your Data Source Here)

  @extends SC.DataSource
*/
Sites.SiteDataSource = SC.DataSource.extend(
/** @scope Sites.SiteDataSource.prototype */
{

  _dbpath: 'sites',

  getServerPath: function(resourceName) {
    var path = '/' + this._dbpath + "//" + resourceName;
    return path;

  },

  getServerView: function(viewName) {
    var path = '/' + this._dbpath + "/_design/sites_app/_view/" + viewName;
    return path;

  },


  // ..........................................................
  // QUERY SUPPORT
  // 
  fetch: function(store, query) {
    console.log(store, query, query.recordType);
    // var rType = query.recordType;
    // // console.log('Query actuando', query.recordType);
    // console.log('Query actuando', rType);
    // // if (query.recordType == Sites.SiteModel) {
    // if (rType == Sites.SiteModel) {
    //   SC.Request.getUrl(this.getServerView('allSites')).json().header('Accept', 'application/json').notify(this, 'didFetchSites', store, query).send();
    //   return YES;
    //
    // // } else if (query.recordType == Sites.VisitModel) {
    // } else if (rType == Sites.VisitModel) {
    //   SC.Request.getUrl(this.getServerView('allVisits')).json().header('Accept', 'application/json').notify(this, 'didFetchVisits', store, query).send();
    //   return YES;
    //
    // }
    // return YES;
    
    switch(query.recordType) {
      case Sites.SiteModel: 
        SC.Request.getUrl(this.getServerView('allSites')).json().header('Accept', 'application/json').notify(this, 'didFetch', store, query).send();
        console.log('fetch: Sites.SiteModel ');
        return YES;
      case Sites.VisitModel: 
        SC.Request.getUrl(this.getServerView('allVisits')).json().header('Accept', 'application/json').notify(this, 'didFetch', store, query).send();
        return YES;
      default:
        return YES;
    }
    
    
  },
  
  
  // didFetchSites: function(response, store, query) {
  //   if (SC.ok(response)) {
  //     var body = response.get('encodedBody');
  //     var couchResponse = SC.json.decode(body);
  //     var records = couchResponse.rows.getEach('value');
  //     store.loadRecords(Sites.SiteModel, records);
  //     store.dataSourceDidFetchQuery(query);
  //   }
  //   else {
  //     store.dataSourceDidErrorQuery(query, response);
  //   }
  // },
  //
  // didFetchVisits: function(response, store, query) {
  //   if (SC.ok(response)) {
  //     var body = response.get('encodedBody');
  //     var couchResponse = SC.json.decode(body);
  //     var records = couchResponse.rows.getEach('value');
  //     store.loadRecords(Sites.VisitModel, records);
  //     store.dataSourceDidFetchQuery(query);
  //   }
  //     else {
  //     store.dataSourceDidErrorQuery(query, response);
  //   }
  // },
  
  didFetch: function(response, store, query) {
    if (SC.ok(response)) {
      var body = response.get('encodedBody');
      var couchResponse = SC.json.decode(body);
      var records = couchResponse.rows.getEach('value');
      store.loadRecords(query.recordType, records);
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
