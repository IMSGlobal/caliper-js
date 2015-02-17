/**
 *  @author Prashant Nayak
 *  @copyright ©2013 IMS Global Learning Consortium, Inc.  All Rights Reserved.
 *  @license For license information contact, info@imsglobal.org
 */

var test = require('tape');
var _ = require('lodash-node');
var util = require('util');
var jsonCompare = require('./testUtils');
var Event = require('../src/events/mediaEvent');
var LearningObjective = require('../src/entities/learningObjective');
var Person = require('../src/entities/lis/person');
var VideoObject = require('../src/entities/media/videoObject');
var MediaLocation = require('../src/entities/media/mediaLocation');
var CourseSection = require('../src/entities/lis/courseSection');
var SoftwareApplication = require('../src/entities/softwareApplication');
var MediaActions = require('../src/actions/mediaActions');

test('Create Media Event and validate attributes', function (t) {

  // Plan for N assertions
  t.plan(1);

  // The Actor for the Caliper Event
  var actor = new Person("https://some-university.edu/user/554433");
  actor.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  actor.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The Action for the Caliper Event
  var action = MediaActions.PAUSED;

  // The Object being interacted with by the Actor
  var eventObj = new VideoObject("https://com.sat/super-media-tool/video/video1");
  eventObj.setName("American Revolution - Key Figures Video");
  eventObj.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  eventObj.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  eventObj.setDuration(1420);

  var lo = new LearningObjective("http://americanrevolution.com/personalities/learn");
  lo.setDescription(null);
  lo.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  lo.setDateModified(null);
  eventObj.setAlignedLearningObjective([lo]);

  // The MediaLocation that is part of the MediaEvent
  var mediaLocation = new MediaLocation("https://com.sat/super-media-tool/video/video1");
  mediaLocation.setDescription(null);
  mediaLocation.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  mediaLocation.setCurrentTime(710);
  mediaLocation.setDateModified(null);

  // The target object within the Event Object
  var targetObj = null;

  // The generated object within the Event Object
  var generatedObj = null;

  // The edApp that is part of the Learning Context
  var edApp = new SoftwareApplication("https://com.sat/super-media-tool");
  edApp.setName("Super Media Tool");
  edApp.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  edApp.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());

  // The LIS Course Section for the Caliper Event
  var org = new CourseSection("https://some-university.edu/politicalScience/2014/american-revolution-101");
  org.setName("American Revolution 101");
  org.setDateCreated((new Date("2015-01-01T06:00:00Z")).toISOString());
  org.setDateModified((new Date("2015-02-02T11:30:00Z")).toISOString());
  org.setCourseNumber("AmRev-101");
  org.setLabel("Am Rev 101");
  org.setSemester("Spring-2014");

  // Asser that key attributes are the same
  var mediaEvent = new Event();
  mediaEvent.setActor(actor);
  mediaEvent.setAction(action);
  mediaEvent.setObject(eventObj);
  // mediaEvent.setMediaLocation(mediaLocation);
  mediaEvent.setTarget(mediaLocation);
  mediaEvent.setGenerated(generatedObj);
  mediaEvent.setEdApp(edApp);
  mediaEvent.setLisOrganization(org);
  mediaEvent.setStartedAtTime((new Date("2015-02-15T10:15:00Z")).toISOString());

  console.log("Media Event = " + util.inspect(mediaEvent));

  // Assert that JSON produced is the same
  jsonCompare('caliperMediaEvent', mediaEvent, t);
})