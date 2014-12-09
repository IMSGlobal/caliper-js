/**
 *  author: Prashant Nayak
 *  ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  For license information contact, info@imsglobal.org
 */

var _ = require('lodash-node');
var Event = require('./caliperEvent');

function AnnotationEvent() {

  Event.call(this);

  this.setContext(this.Contexts.ANNOTATION);
  this.setType(this.Types.ANNOTATION);

  this.setGenerated(null);
  this.setStartedAtTime(0);
  this.setEndedAtTime(0);
  this.setDuration(null);
}

AnnotationEvent.prototype = _.create(Event.prototype);

module.exports = AnnotationEvent;