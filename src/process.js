'use strict'
var request = require('request');
var auth = require('./auth');
var _ = require('lodash');
function processData(data){
     data.forEach(obj => {
      request({
        url: process.env.OPENIMIS_URL+'/Organisation/',
        method: 'GET',
        headers : {
          "Authorization" : auth.user
        },
      }, function(error, response, body){
            let res = JSON.parse(body);
            if(res.entry){
              const organisation = res.entry.find(element => element.resource.code == obj.code);
              if(organisation !=undefined){
                  if(organisation.resource.code !=obj.code || organisation.resource.email !=obj.email || organisation.resource.trade_name !=obj.trade_name || organisation.resource.phone != obj.phone || organisation.resource.legal_form != obj.legal_form || organisation.resource.phone != obj.phone || !_.isEqual(obj.address,organisation.resource.address)){
                    request({
                    url: process.env.OPENIMIS_URL+'/Organisation/'+organisation.resource.id+'/',
                    method: 'PUT',
                    headers : {
                    "Authorization" : auth.user
                    },
                    json:obj
                    }, function(error, response, body){
                    if(response){
                      return response
                    }else{
                      return body  
                    }
                    });
                  }
              }else{
              request({
              url: process.env.OPENIMIS_URL+'/Organisation/',
              method: 'POST',
              headers : {
              "Authorization" : auth.user
              },
              json:obj
              }, function(error, response, body){
              return body
              });
              }
        }else{
          request({
            url: process.env.OPENIMIS_URL+'/Organisation/',
            method: 'POST',
            headers : {
            "Authorization" : auth.user
            },
            json:obj
            }, function(error, response, body){
            return body
            });
        }
        
      });
     });
  
}

exports.processData = processData