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

var moment = require('moment');
var test = require('tape');

var eventFactory = require('../../src/events/eventFactory');
var MediaEvent = require('../../src/events/mediaEvent');
var MediaActions = require('../../src/actions/mediaActions');

var entityFactory = require('../../src/entities/entityFactory');
var CourseOffering = require('../../src/entities/lis/courseOffering');
var CourseSection = require('../../src/entities/lis/courseSection');
var Group = require('../../src/entities/lis/group');
var LearningObjective = require('../../src/entities/assign/learningObjective');
var MediaLocation = require('../../src/entities/resource/mediaLocation');
var Membership = require('../../src/entities/lis/membership');
var Person = require('../../src/entities/agent/person');
var Role = require('../../src/entities/lis/role');
var SoftwareApplication = require('../../src/entities/agent/SoftwareApplication');
var VideoObject = require('../../src/entities/resource/videoObject');
var Status = require('../../src/entities/lis/status');

var jsonCompare = require('../testUtils');

test('Create a MediaEvent (paused) and validate properties', function (t) {

  // Plan for N assertions
  t.plan(1);

  const BASE_COURSE_IRI = "https://example.edu/politicalScience/2015/american-revolution-101";
  var baseVideoIRI = "https://example.com/super-media-tool/video/1225";

  // The Actor for the Caliper Event
  var actorId = "https://example.edu/user/554433";
  var actor = entityFactory().create(Person, actorId, {
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z")
  });

  // The Action for the Caliper Event
  var action = MediaActions.PAUSED;

  // Learning Objective
  var learningObjectiveId = "https://example.edu/american-revolution-101/personalities/learn";
  var learningObjective = entityFactory().create(LearningObjective, learningObjectiveId, {
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z")
  });

  // The Object of the interaction
  var obj = entityFactory().create(VideoObject, baseVideoIRI, {
    name: "American Revolution - Key Figures Video",
    mediaType: "video/ogg",
    duration: "PT1H12M27S",
    alignedLearningObjective: [learningObjective],
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z"),
    version: "1.0"
  });

  // The target location
  var target = entityFactory().create(MediaLocation, baseVideoIRI, {
    currentTime: "PT30M54S",
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    version: "1.0"
  });

  // The edApp
  var edAppId = "https://example.com/super-media-tool";
  var edApp = entityFactory().create(SoftwareApplication, edAppId, {
    name: "Super Media Tool",
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z"),
    version: "Version 2"
  });

  // LIS Course Offering
  var course = entityFactory().create(CourseOffering, BASE_COURSE_IRI, {
    name: "Political Science 101: The American Revolution",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z")
  });

  // LIS Course Section
  var sectionId = BASE_COURSE_IRI.concat("/section/001");
  var section = entityFactory().create(CourseSection, sectionId, {
    name: "American Revolution 101",
    courseNumber: "POL101",
    academicSession: "Fall-2015",
    subOrganizationOf: course,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z"),
    dateModified: moment.utc("2015-09-02T11:30:00.000Z")
  });

  // LIS Group
  var groupId = sectionId.concat("/group/001");
  var group = entityFactory().create(Group, groupId, {
    name: "Discussion Group 001",
    subOrganizationOf: section,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z")
  });

  // The Actor's Membership
  var membershipId = BASE_COURSE_IRI.concat("/roster/554433");
  var membership = entityFactory().create(Membership, membershipId, {
    name: "American Revolution 101",
    description: "Roster entry",
    member: actor['@id'],
    organization: section['@id'],
    roles: [Role.LEARNER],
    status: Status.ACTIVE,
    dateCreated: moment.utc("2015-08-01T06:00:00.000Z")
  });

  // Assert that key attributes are the same
  var event = eventFactory().create(MediaEvent, {
    actor: actor,
    action: action,
    object: obj,
    eventTime: moment.utc("2015-09-15T10:15:00.000Z"),
    target: target,
    edApp: edApp,
    group: group,
    membership: membership
  });
  
  // Assert that the JSON produced is the same
  jsonCompare('caliperEventMediaPausedVideo', event, t);
});