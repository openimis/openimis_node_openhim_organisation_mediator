'use strict'
var request = require('request');
var auth = require('./auth');
var _ = require('lodash');
function companyDeactivate(data){
     request({
        url: process.env.OPENIMIS_URL+'/Organisation/',
        method: 'GET',
        headers : {
          "Authorization" : auth.user
        },
      }, function(error, response, body){
        let res = JSON.parse(body);
        if(res.entry !=undefined){
          res.entry.forEach(element => {
            const organisation = data.find(obj=>obj.code==element.resource.code);
            if(organisation ==undefined){
              request({
                  url: process.env.OPENIMIS_URL+'/Organisation/'+element.resource.id+'/',
                  method: 'DELETE',
                  headers : {
                    "Authorization" : auth.user
                  },
                }, function(error, response, body){
                  if(response){
                    return response
                  }else{
                   return body  
                  }
                }); 
            }
          });
        }
      });
  
}
exports.companyDeactivate = companyDeactivate