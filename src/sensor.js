/*
 * This file is part of IMS Caliper Analytics™ and is licensed to
 * IMS Global Learning Consortium, Inc. (http://www.imsglobal.org)
 * under one or more contributor license agreements.  See the NOTICE
 * file distributed with this work for additional information.
 *
 * IMS Caliper is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * IMS Caliper is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with this program. If not, see http://www.gnu.org/licenses/.
 */

 /**
 * Caliper Sensor
 * @class
 */
var _ = require('lodash-node');
var client = require('./client');
var logger = require('./logger');

/**
 * Grab an existing namespace object or create a blank object if it doesn't exist
 * so we can attach non-sensor module exports to it
 * @type {{}|*|Caliper}
 */
var Caliper = window.Caliper || {};

/**
 * Represents Caliper Sensor.  
 * @constructor
 */
var Sensor = {};

/**
 * Sensor Identifier.
 * @param id
 */
Sensor.setId = function(id) {
    this.id = id;
};

/**
 * Initializes the default client to use. Uses the socket consumer by default.
 * Sensor#initialize
 * @param id sensor identifier
 * @param options $options passed straight to the client
 */
Sensor.initialize = function(id, options) {
    this.setId(id);
    if (!_.isUndefined(options)) {
        client.initialize(options);
    }
};

/**
 * Describe an entity
 * @param  entity $entity The Caliper Entity we are describing
 * @return boolean whether the describe call succeeded
 */
Sensor.describe = function(entity) {
    client.describe(this, entity);
};

/**
 * Send learning events
 * @param  event $event The Caliper Event
 * @return boolean whether the measure call succeeded
 */
Sensor.send = function(event) {
    client.send(this, event);
};

/**
 * Add the modules that need to be exported under the Caliper namespace.
 * You only need to require the top-level modules. Browserify will walk the
 * dependency graph and load everything correctly.
 */
Caliper.Actions = {};
Caliper.Context = {};
Caliper.Entities = {};
Caliper.Events = {};
Caliper.Request = {};

// ACTIONS
Caliper.Actions.AnnotationActions     = require('./actions/annotationActions');
Caliper.Actions.AssessmentActions     = require('./actions/assessmentActions');
Caliper.Actions.AssessmentItemActions = require('./actions/assessmentItemActions');
Caliper.Actions.AssignableActions     = require('./actions/assignableActions');
Caliper.Actions.MediaActions          = require('./actions/mediaActions');
Caliper.Actions.NavigationActions     = require('./actions/navigationActions');
Caliper.Actions.OutcomeActions        = require('./actions/outcomeActions');
Caliper.Actions.ReadingActions        = require('./actions/readingActions');
Caliper.Actions.SessionActions        = require('./actions/sessionActions');

// CONTEXT
Caliper.Context.Context = require('./context/Context');

// ENTITIES
Caliper.Entities.Entity     = require('./entities/entity');
Caliper.Entities.EntityType = require('./entities/entityType');

// Core entities
Caliper.Entities.DigitalResource     = require('./entities/digitalResource');
Caliper.Entities.DigitalResourceType = require('./entities/digitalResourceType');
Caliper.Entities.LearningObjective   = require('./entities/learningObjective');

// Agent entities
Caliper.Entities.Organization        = require('./entities/agent/organization');
Caliper.Entities.Person              = require('./entities/agent/person');
Caliper.Entities.SoftwareApplication = require('./entities/agent/softwareApplication');

// Annotation entities
Caliper.Entities.Annotation          = require('./entities/annotation/annotation');
Caliper.Entities.AnnotationType      = require('./entities/annotation/annotationType');
Caliper.Entities.BookmarkAnnotation  = require('./entities/annotation/bookmarkAnnotation');
Caliper.Entities.HighlightAnnotation = require('./entities/annotation/highlightAnnotation');
Caliper.Entities.SharedAnnotation    = require('./entities/annotation/sharedAnnotation');
Caliper.Entities.TagAnnotation       = require('./entities/annotation/tagAnnotation');

// Assignment entities
Caliper.Entities.Assessment          = require('./entities/assessment/assessment');
Caliper.Entities.AssessmentItem      = require('./entities/assessment/assessmentItem');

// Assignable entities
Caliper.Entities.AssignableDigitalResource     = require('./entities/assignable/assignableDigitalResource');
Caliper.Entities.AssignableDigitalResourceType = require('./entities/assignable/assignableDigitalResourceType');
Caliper.Entities.Attempt                       = require('./entities/assignable/attempt');

// LIS entities
Caliper.Entities.CourseOffering = require('./entities/lis/courseOffering');
Caliper.Entities.CourseSection  = require('./entities/lis/courseSection');
Caliper.Entities.Group          = require('./entities/lis/group');
Caliper.Entities.Membership     = require('./entities/lis/membership');
Caliper.Entities.Role           = require('./entities/lis/role');
Caliper.Entities.Status         = require('./entities/lis/status');

// Media Entities
Caliper.Entities.MediaObject       = require('./entities/media/mediaObject');
Caliper.Entities.MediaObjectType   = require('./entities/media/mediaObjectType');
Caliper.Entities.MediaLocation     = require('./entities/media/mediaLocation');
Caliper.Entities.AudioObject       = require('./entities/media/audioObject');
Caliper.Entities.ImageObject       = require('./entities/media/imageObject');
Caliper.Entities.VideoObject       = require('./entities/media/videoObject');

// Outcome Entities
Caliper.Entities.Result = require('./entities/outcome/result');

// Reading Entities
Caliper.Entities.EPubChapter    = require('./entities/reading/ePubChapter');
Caliper.Entities.EPubPart       = require('./entities/reading/ePubPart');
Caliper.Entities.EPubSubChapter = require('./entities/reading/ePubSubChapter');
Caliper.Entities.EPubVolume     = require('./entities/reading/ePubVolume');
Caliper.Entities.Frame          = require('./entities/reading/frame');
Caliper.Entities.Reading        = require('./entities/reading/reading');
Caliper.Entities.WebPage        = require('./entities/reading/webPage');

// Response Entities
Caliper.Entities.Response                 = require('./entities/response/response');
Caliper.Entities.ResponseType             = require('./entities/response/responseType');
Caliper.Entities.FillinBlankResponse      = require('./entities/response/fillinBlankResponse');
Caliper.Entities.MultipleChoiceResponse   = require('./entities/response/multipleChoiceResponse');
Caliper.Entities.MultipleResponseResponse = require('./entities/response/multipleResponseResponse');
Caliper.Entities.SelectTextResponse       = require('./entities/response/selectTextResponse');
Caliper.Entities.TrueFalseResponse        = require('./entities/response/trueFalseResponse');

// Session Entities
Caliper.Entities.Session = require('./entities/session/session');

// EVENTS
Caliper.Events.Event               = require('./events/event');
Caliper.Events.EventType           = require('./events/eventType');
Caliper.Events.AnnotationEvent     = require('./events/annotationEvent');
Caliper.Events.AssessmentEvent     = require('./events/assessmentEvent');
Caliper.Events.AssessmentItemEvent = require('./events/assessmentItemEvent');
Caliper.Events.AssignableEvent     = require('./events/assignableEvent');
Caliper.Events.MediaEvent          = require('./events/mediaEvent');
Caliper.Events.NavigationEvent     = require('./events/navigationEvent');
Caliper.Events.OutcomeEvent        = require('./events/outcomeEvent');
Caliper.Events.SessionEvent        = require('./events/sessionEvent');
Caliper.Events.ViewEvent           = require('./events/viewEvent');

// REQUEST
Caliper.Request.Envelope            = require('./request/envelope');
Caliper.Request.EventStoreRequestor = require('./request/eventStoreRequestor');
Caliper.Request.HttpRequestor       = require('./request/httpRequestor');

// Replace/Create the global namespace and objects (the sensor) we want there
Caliper.Sensor = Sensor;

// Replace/create Caliper in global namespace
window.Caliper = Caliper;

logger.log('debug', "Added Sensor to window global %o", window.Sensor);
